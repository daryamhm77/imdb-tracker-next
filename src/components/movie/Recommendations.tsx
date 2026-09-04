import Badge from '@/components/ui/Badge';
import MovieGrid from '@/components/ui/MovieGrid';
import Section, { SectionHeader } from '@/components/ui/Section';
import type { Movie } from '@/lib/types';

export default function Recommendations({ movies }: { movies: Movie[] }) {
  if (movies.length === 0) return null;

  return (
    <Section className="pb-16">
      <SectionHeader
        title="Recommended For You"
        action={<Badge tone="amber">Based on your taste</Badge>}
      />
      <MovieGrid movies={movies} layout="dense" />
    </Section>
  );
}
