import EmptyState from '@/components/ui/EmptyState';
import MovieGrid from '@/components/ui/MovieGrid';
import Tabs from '@/components/ui/Tabs';
import { FAV_LISTS, favItemToMovie, type FavList, type UserFavItem } from '@/lib/types';

const labels: Record<FavList, string> = {
  favorite: 'Favorites',
  watchlist: 'Watchlist',
  watched: 'Watched',
};

export default function Favorites({
  favs,
  activeList,
}: {
  favs: UserFavItem[];
  activeList: FavList;
}) {
  const visible = favs.filter((fav) => fav.list === activeList);

  return (
    <div>
      <Tabs
        items={FAV_LISTS.map((list) => ({
          href: list === 'favorite' ? '/favorites' : `/favorites?list=${list}`,
          label: labels[list],
          active: activeList === list,
        }))}
      />
      {visible.length === 0 ? (
        <EmptyState title="Nothing here yet" />
      ) : (
        <MovieGrid movies={visible.map(favItemToMovie)} />
      )}
    </div>
  );
}
