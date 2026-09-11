import Link from 'next/link';
import MovieGrid from '@/components/ui/MovieGrid';
import Section, { SectionHeader } from '@/components/ui/Section';
import { getTrending } from '@/lib/api';
import type { Movie } from '@/lib/types';

export default async function HomeMovieGrid() {
  let movies: Movie[] = [];
  try {
    movies = (await getTrending()).slice(0, 10);
  } catch (error) {
    console.error('Failed to load trending movies', error);
  }

  if (movies.length === 0) {
    return (
      <Section tone="muted" divided className="py-16">
        <SectionHeader title="Trending This Week" />
        <p className="text-center text-muted">
          Trending titles could not be loaded. Try again in a moment.
        </p>
      </Section>
    );
  }

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
