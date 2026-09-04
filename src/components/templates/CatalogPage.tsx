import Container from '@/components/ui/Container';
import EmptyState from '@/components/ui/EmptyState';
import MovieGrid from '@/components/ui/MovieGrid';
import type { Movie } from '@/lib/types';

export default function CatalogPage({
  movies,
  emptyTitle,
  toolbar,
  footer,
}: {
  movies: Movie[];
  emptyTitle: string;
  toolbar?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <Container className="py-4">
      {toolbar}
      {movies.length === 0 ? (
        <EmptyState title={emptyTitle} />
      ) : (
        <>
          <MovieGrid movies={movies} className="py-8" />
          {footer}
        </>
      )}
    </Container>
  );
}
