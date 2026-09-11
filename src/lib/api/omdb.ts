import { unstable_cache } from 'next/cache';
import { Movie, MovieDetail, toMovie } from '@/lib/types';
import { getOmdbApiKey } from '@/lib/env';

const OMDB_REVALIDATE = 3600;
const ID_CONCURRENCY = 2;

type OmdbSearchResponse = {
  Response?: string;
  Error?: string;
  Search?: Array<{
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
  }>;
  totalResults?: string;
};

function omdbUrl(params: Record<string, string>): string {
  const url = new URL('https://www.omdbapi.com');
  url.searchParams.set('apikey', getOmdbApiKey());
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

async function omdbFetch<T extends { Response?: string; Error?: string }>(
  params: Record<string, string>
): Promise<T> {
  const res = await fetch(omdbUrl(params), {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`OMDb HTTP ${res.status}`);
  }

  const data = (await res.json()) as T;
  if (data.Response === 'False' || data.Error) {
    throw new Error(data.Error || 'OMDb returned no data');
  }

  return data;
}

async function fetchMovieByIdUncached(id: string): Promise<MovieDetail> {
  return omdbFetch<MovieDetail & { Response?: string; Error?: string }>({
    i: id,
    plot: 'full',
  });
}

export async function getMovieById(id: string): Promise<MovieDetail | null> {
  try {
    return await unstable_cache(
      () => fetchMovieByIdUncached(id),
      ['omdb-movie', id],
      { revalidate: OMDB_REVALIDATE, tags: ['omdb', `omdb-movie-${id}`] }
    )();
  } catch {
    return null;
  }
}

export async function searchMovies(
  term: string,
  filters?: { y?: string; type?: string; page?: number }
): Promise<{ movies: Movie[]; totalResults: number }> {
  try {
    const data = await unstable_cache(
      () =>
        omdbFetch<OmdbSearchResponse>({
          s: term,
          page: String(filters?.page ?? 1),
          ...(filters?.y ? { y: filters.y } : {}),
          ...(filters?.type ? { type: filters.type } : {}),
        }),
      ['omdb-search', term, filters?.y ?? '', filters?.type ?? '', String(filters?.page ?? 1)],
      { revalidate: OMDB_REVALIDATE, tags: ['omdb', `omdb-search-${term}`] }
    )();

    return {
      movies: (data.Search ?? []).map(toMovie),
      totalResults: parseInt(data.totalResults || '0', 10),
    };
  } catch {
    return { movies: [], totalResults: 0 };
  }
}

async function mapPool<T, R>(
  items: readonly T[],
  concurrency: number,
  mapper: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await mapper(items[index]);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker())
  );

  return results;
}

export async function getMoviesByIds(ids: readonly string[]): Promise<MovieDetail[]> {
  const results = await mapPool(ids, ID_CONCURRENCY, getMovieById);
  return results.filter((movie): movie is MovieDetail => movie !== null);
}
