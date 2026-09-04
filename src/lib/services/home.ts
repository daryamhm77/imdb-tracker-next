import { cache } from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { getDbUser } from '@/lib/actions/user';
import {
  computeDashboardData,
  toFavItems,
  toRecentlyViewedItems,
  type DashboardStats,
} from '@/lib/dashboard';
import { getRecommendations } from '@/lib/services/recommendations';
import type { Movie, UserFavItem } from '@/lib/types';

export type HomePersonalData = {
  watchlist: UserFavItem[];
  stats: DashboardStats;
  recommendations: Movie[];
};

export const getHomePersonalData = cache(async (): Promise<HomePersonalData | null> => {
  const user = await currentUser();
  if (!user) return null;

  const dbUser = await getDbUser(user);
  const favs = toFavItems(dbUser.favs);
  const dashboard = computeDashboardData(
    favs,
    toRecentlyViewedItems(dbUser.recentlyViewed)
  );

  return {
    watchlist: favs.filter((fav) => fav.list === 'watchlist').slice(0, 4),
    stats: dashboard.stats,
    recommendations: await getRecommendations(favs),
  };
});
