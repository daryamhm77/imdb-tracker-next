import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import AppPage from '@/components/templates/AppPage';
import DashboardContent from '@/components/user/DashboardContent';
import { getDbUser } from '@/lib/actions/user';
import {
  computeDashboardData,
  toFavItems,
  toRecentlyViewedItems,
} from '@/lib/dashboard';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your movie tracking dashboard',
};

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const dbUser = await getDbUser(user);
  const data = computeDashboardData(
    toFavItems(dbUser.favs),
    toRecentlyViewedItems(dbUser.recentlyViewed)
  );

  return (
    <AppPage title="Dashboard">
      <DashboardContent {...data} />
    </AppPage>
  );
}
