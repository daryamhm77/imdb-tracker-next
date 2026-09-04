import Surface from '@/components/ui/Surface';
import UserWatchlist from '@/components/user/UserWatchlist';
import UserStats from '@/components/user/UserStats';
import { getHomePersonalData } from '@/lib/services/home';

const guestStats = {
  totalFavorites: 0,
  totalWatchlist: 0,
  totalWatched: 0,
  total: 0,
  avgRating: null,
};

export default async function HomeHeroPersonal() {
  const personal = await getHomePersonalData();

  if (!personal) {
    return (
      <>
        <Surface variant="dashed" className="px-4 py-8 text-center text-sm text-muted">
          Sign in to see your watchlist and stats.
        </Surface>
        <UserStats stats={guestStats} />
      </>
    );
  }

  return (
    <>
      <UserWatchlist items={personal.watchlist} />
      <UserStats stats={personal.stats} />
    </>
  );
}
