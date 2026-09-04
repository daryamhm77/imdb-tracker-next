import type { Metadata } from 'next';
import CatalogPage from '@/components/templates/CatalogPage';
import { getTrending, getTopRated } from '@/lib/api';

export const revalidate = 3600;

export function generateStaticParams() {
  return [{ genre: 'trending' }, { genre: 'top_rated' }];
}

interface GenrePageProps {
  params: Promise<{ genre: string }>;
}

export async function generateMetadata({ params }: GenrePageProps): Promise<Metadata> {
  const { genre } = await params;
  const title = genre === 'top_rated' ? 'Top Rated' : 'Trending';
  return {
    title: `${title} Movies`,
    description: `Browse ${title.toLowerCase()} movies and TV shows`,
  };
}

export default async function GenrePage({ params }: GenrePageProps) {
  const { genre } = await params;
  const movies = genre === 'top_rated' ? await getTopRated() : await getTrending();

  return <CatalogPage movies={movies} emptyTitle="No results found" />;
}
