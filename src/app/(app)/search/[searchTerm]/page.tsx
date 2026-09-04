import { Suspense } from 'react';
import type { Metadata } from 'next';
import CatalogPage from '@/components/templates/CatalogPage';
import SearchFilters from '@/components/search/SearchFilters';
import Pagination from '@/components/search/Pagination';
import { searchMovies } from '@/lib/api';

export const dynamic = 'force-dynamic';

interface SearchPageProps {
  params: Promise<{ searchTerm: string }>;
  searchParams: Promise<{ y?: string; type?: string; page?: string }>;
}

export async function generateMetadata({ params }: SearchPageProps): Promise<Metadata> {
  const { searchTerm } = await params;
  return {
    title: `"${searchTerm}" — Search Results`,
    description: `Search results for "${searchTerm}" on IMDb Tracker`,
  };
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { searchTerm } = await params;
  const { y, type, page } = await searchParams;
  const currentPage = parseInt(page || '1', 10);
  const { movies, totalResults } = await searchMovies(searchTerm, {
    y,
    type,
    page: currentPage,
  });
  const totalPages = Math.ceil(totalResults / 10);

  return (
    <CatalogPage
      movies={movies}
      emptyTitle={`No movies found for "${searchTerm}"`}
      toolbar={
        <>
          <Suspense fallback={<div className="h-14" />}>
            <SearchFilters searchTerm={searchTerm} />
          </Suspense>
          {movies.length > 0 && (
            <p className="pt-4 text-sm text-muted">
              {totalResults} result{totalResults !== 1 ? 's' : ''} for &quot;{searchTerm}&quot;
            </p>
          )}
        </>
      }
      footer={
        totalPages > 1 ? (
          <Pagination
            searchTerm={searchTerm}
            currentPage={currentPage}
            totalPages={totalPages}
            y={y}
            type={type}
          />
        ) : null
      }
    />
  );
}
