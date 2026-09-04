import Card from '@/components/movie/Card';
import { cn } from '@/lib/cn';
import type { Movie } from '@/lib/types';

const layouts = {
  catalog: 'grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  dense: 'grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
} as const;

export default function MovieGrid({
  movies,
  layout = 'catalog',
  className,
}: {
  movies: Movie[];
  layout?: keyof typeof layouts;
  className?: string;
}) {
  return (
    <div className={cn('grid', layouts[layout], className)}>
      {movies.map((movie) => (
        <Card key={movie.imdbID} result={movie} />
      ))}
    </div>
  );
}
