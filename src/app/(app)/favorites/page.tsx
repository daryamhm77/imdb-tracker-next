import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import AppPage from '@/components/templates/AppPage';
import Favorites from '@/components/user/Favorites';
import { getDbUser } from '@/lib/actions/user';
import { toFavItems } from '@/lib/dashboard';
import { isFavList } from '@/lib/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'My Favorites',
  description: 'Your saved favorite movies',
};

export default async function FavoritesPage({
  searchParams,
}: {
  searchParams: Promise<{ list?: string }>;
}) {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const { list } = await searchParams;
  const dbUser = await getDbUser(user);

  return (
    <AppPage title="My Favorites">
      <Favorites favs={toFavItems(dbUser.favs)} activeList={isFavList(list) ? list : 'favorite'} />
    </AppPage>
  );
}
