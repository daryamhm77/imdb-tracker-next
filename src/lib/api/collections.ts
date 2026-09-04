import { Movie, toMovie } from '@/lib/types';
import { TRENDING_IDS, TOP_RATED_IDS } from '@/lib/constants/movies';
import { getMoviesByIds } from './omdb';

async function getMovieSummaries(ids: readonly string[]): Promise<Movie[]> {
  const movies = await getMoviesByIds(ids);
  return movies.map(toMovie);
}

export const getTrending = () => getMovieSummaries(TRENDING_IDS);

export const getTopRated = () => getMovieSummaries(TOP_RATED_IDS);
