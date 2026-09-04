import Link from 'next/link';
import Image from 'next/image';
import { MdStar } from 'react-icons/md';
import Surface from '@/components/ui/Surface';
import { POSTER_THUMB_FALLBACK } from '@/lib/constants/media';
import type { UserFavItem } from '@/lib/types';

export default function UserWatchlist({ items }: { items: UserFavItem[] }) {
  if (items.length === 0) {
    return (
      <Surface variant="dashed" className="px-4 py-8 text-center text-sm text-muted">
        Your watchlist is empty. Search a title to start tracking.
      </Surface>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Link
          key={item.movieId}
          href={`/movie/${item.movieId}`}
          className="flex items-center gap-4 rounded-2xl border border-card-border bg-card p-4 transition hover:border-red-500/20"
        >
          <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={item.image || POSTER_THUMB_FALLBACK}
              alt={item.title}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{item.title}</p>
            <p className="text-xs text-muted">
              {item.dateReleased} · Watchlist
            </p>
          </div>
          {item.rating && item.rating !== 'N/A' && (
            <div className="flex items-center gap-1 text-amber-400">
              <MdStar size={14} />
              <span className="font-bold">{item.rating}</span>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
