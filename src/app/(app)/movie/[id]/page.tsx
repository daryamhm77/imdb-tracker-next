import type { Metadata } from 'next';
import MovieDetail from '@/components/movie/MovieDetail';
import StatusPage from '@/components/templates/StatusPage';
import { getMovieById } from '@/lib/api';
import { CURATED_MOVIE_IDS } from '@/lib/constants/movies';

export const revalidate = 3600;

export function generateStaticParams() {
  return CURATED_MOVIE_IDS.map((id) => ({ id }));
}

interface MovieDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: MovieDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieById(id);

  if (!movie) return { title: 'Movie not found' };

  return {
    title: `${movie.Title} (${movie.Year})`,
    description: movie.Plot || `${movie.Title} movie details`,
    openGraph: {
      title: movie.Title,
      description: movie.Plot || undefined,
      images: movie.Poster ? [{ url: movie.Poster }] : [],
    },
  };
}

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const { id } = await params;
  const movie = await getMovieById(id);

  if (!movie) {
    return (
      <StatusPage
        title="Movie not found"
        description="We couldn't find that title. Try another search."
      />
    );
  }

  return <MovieDetail movie={movie} />;
}
