import { CLASSIC_IDS, RECOMMENDATION_CANDIDATE_IDS } from '@/lib/constants/movies';
import { getMoviesByIds } from '@/lib/api/omdb';
import { toMovie, type Movie, type UserFavItem } from '@/lib/types';

function genresOf(genre: string | undefined): string[] {
  return genre ? genre.split(',').map((g) => g.trim()).filter(Boolean) : [];
}

export async function getRecommendations(favs: UserFavItem[]): Promise<Movie[]> {
  if (favs.length === 0) return [];

  const topRated = favs
    .filter((fav) => fav.rating && parseFloat(fav.rating) >= 8)
    .slice(0, 5);

  if (topRated.length === 0) {
    const classics = await getMoviesByIds(CLASSIC_IDS.slice(0, 5));
    return classics.map(toMovie);
  }

  const [seeds, pool] = await Promise.all([
    getMoviesByIds(topRated.map((fav) => fav.movieId)),
    getMoviesByIds([...new Set([...RECOMMENDATION_CANDIDATE_IDS, ...CLASSIC_IDS])]),
  ]);

  const likedGenres = new Set(seeds.flatMap((movie) => genresOf(movie.Genre)));
  const seen = new Set(topRated.map((fav) => fav.movieId));

  const matched: Movie[] = [];
  const fallback: Movie[] = [];

  for (const movie of pool) {
    if (seen.has(movie.imdbID)) continue;

    const summary = toMovie(movie);
    const overlaps = genresOf(movie.Genre).some((genre) => likedGenres.has(genre));
    if (overlaps) {
      matched.push(summary);
    } else {
      fallback.push(summary);
    }
  }

  return [...matched, ...fallback].slice(0, 10);
}
