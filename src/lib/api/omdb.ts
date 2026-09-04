import { Movie, MovieDetail, toMovie } from '@/lib/types';
import { getOmdbApiKey } from '@/lib/env';

const OMDB_REVALIDATE = 3600;

function omdbUrl(params: Record<string, string>): string {
  const url = new URL('https://www.omdbapi.com');
  url.searchParams.set('apikey', getOmdbApiKey());
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

function normalizeMovie(item: {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}): Movie {
  return toMovie(item);
}

export async function searchMovies(
  term: string,
  filters?: { y?: string; type?: string; page?: number }
): Promise<{ movies: Movie[]; totalResults: number }> {
  const url = omdbUrl({
    s: term,
    page: String(filters?.page ?? 1),
    ...(filters?.y ? { y: filters.y } : {}),
    ...(filters?.type ? { type: filters.type } : {}),
  });

  const res = await fetch(url, {
    next: { revalidate: OMDB_REVALIDATE, tags: ['omdb', `omdb-search-${term}`] },
  });
  if (!res.ok) return { movies: [], totalResults: 0 };

  const data = await res.json();
  return {
    movies: (data.Search ?? []).map(normalizeMovie),
    totalResults: parseInt(data.totalResults || '0', 10),
  };
}

export async function getMovieById(id: string): Promise<MovieDetail | null> {
  const url = omdbUrl({ i: id, plot: 'full' });

  const res = await fetch(url, {
    next: { revalidate: OMDB_REVALIDATE, tags: ['omdb', `omdb-movie-${id}`] },
  });
  if (!res.ok) return null;

  const data = await res.json();
  if (data.Error) return null;

  return data as MovieDetail;
}

export async function getMoviesByIds(ids: readonly string[]): Promise<MovieDetail[]> {
  const results = await Promise.all(
    ids.map((id) => getMovieById(id).catch(() => null))
  );

  return results.filter((movie): movie is MovieDetail => movie !== null);
}
