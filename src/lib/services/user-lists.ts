import User from '@/lib/models/user.model';
import { isFavList, type FavList, type UserFavItem } from '@/lib/types';

export type ToggleFavInput = {
  movieId: string;
  title: string;
  description?: string;
  dateReleased?: string;
  rating?: string;
  image?: string;
  list: FavList;
};

export function parseFavList(value: unknown): FavList {
  return isFavList(value) ? value : 'favorite';
}

export function movieLists(favs: UserFavItem[] | undefined, movieId: string): FavList[] {
  return (favs ?? [])
    .filter((fav) => fav.movieId === movieId)
    .map((fav) => fav.list);
}

export function filterFavsByList(
  favs: UserFavItem[] | undefined,
  list: FavList
): UserFavItem[] {
  return (favs ?? []).filter((fav) => fav.list === list);
}

export function hasFavEntry(
  favs: UserFavItem[] | undefined,
  movieId: string,
  list: FavList
): boolean {
  return Boolean(favs?.some((fav) => fav.movieId === movieId && fav.list === list));
}

export async function toggleFav(userId: string, data: ToggleFavInput, exists: boolean) {
  if (exists) {
    return User.findByIdAndUpdate(
      userId,
      { $pull: { favs: { movieId: data.movieId, list: data.list } } },
      { new: true }
    );
  }

  return User.findByIdAndUpdate(
    userId,
    {
      $push: {
        favs: {
          movieId: data.movieId,
          title: data.title,
          description: data.description ?? '',
          dateReleased: data.dateReleased ?? '',
          rating: data.rating ?? '',
          image: data.image ?? '',
          list: data.list,
        },
      },
    },
    { new: true }
  );
}

export async function recordRecentlyViewed(
  userId: string,
  item: { movieId: string; title: string; image: string; year: string }
) {
  await User.findByIdAndUpdate(userId, {
    $pull: { recentlyViewed: { movieId: item.movieId } },
  });

  await User.findByIdAndUpdate(userId, {
    $push: {
      recentlyViewed: {
        $each: [{ ...item, viewedAt: new Date() }],
        $position: 0,
        $slice: 20,
      },
    },
  });
}
