import Link from 'next/link';
import MovieGrid from '@/components/ui/MovieGrid';
import Section, { SectionHeader } from '@/components/ui/Section';
import { getTrending } from '@/lib/api';

export default async function HomeMovieGrid() {
  const movies = (await getTrending()).slice(0, 10);
  if (movies.length === 0) return null;

  return (
    <Section tone="muted" divided className="py-16">
      <SectionHeader
        title="Trending This Week"
        action={
          <Link
            href="/top/trending"
            className="text-sm font-semibold text-amber-500 transition hover:text-amber-400"
          >
            View All &rarr;
          </Link>
        }
      />
      <MovieGrid movies={movies} layout="dense" />
    </Section>
  );
}
