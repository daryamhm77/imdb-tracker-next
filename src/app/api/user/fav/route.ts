import { NextRequest, NextResponse } from 'next/server';
import { getDbUser } from '@/lib/actions/user';
import { requireApiUser } from '@/lib/auth';
import { toFavItems } from '@/lib/dashboard';
import {
  filterFavsByList,
  hasFavEntry,
  movieLists,
  parseFavList,
  toggleFav,
} from '@/lib/services/user-lists';
import { isFavList } from '@/lib/types';

export async function PUT(req: NextRequest) {
  const { user, error } = await requireApiUser();
  if (!user) return error;

  try {
    const dbUser = await getDbUser(user);
    const data = await req.json();
    const list = parseFavList(data.list);

    if (!data.movieId || !data.title) {
      return NextResponse.json({ error: 'movieId and title are required' }, { status: 400 });
    }

    const updatedUser = await toggleFav(
      dbUser._id.toString(),
      {
        movieId: data.movieId,
        title: data.title,
        description: data.description,
        dateReleased: data.dateReleased,
        rating: data.rating,
        image: data.image,
        list,
      },
      hasFavEntry(toFavItems(dbUser.favs), data.movieId, list)
    );

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    console.error('Error updating favorites:', err);
    return NextResponse.json({ error: 'Error updating favorites' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { user, error } = await requireApiUser();
  if (!user) return error;

  try {
    const dbUser = await getDbUser(user);
    const favs = toFavItems(dbUser.favs);
    const { searchParams } = new URL(req.url);
    const list = searchParams.get('list');
    const movieId = searchParams.get('movieId');

    if (movieId) {
      return NextResponse.json({ lists: movieLists(favs, movieId) }, { status: 200 });
    }

    return NextResponse.json(
      { favs: isFavList(list) ? filterFavsByList(favs, list) : favs },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error fetching favorites:', err);
    return NextResponse.json({ error: 'Error fetching favorites' }, { status: 500 });
  }
}
