import { NextRequest, NextResponse } from 'next/server';
import { getDbUser } from '@/lib/actions/user';
import { requireApiUser } from '@/lib/auth';
import { recordRecentlyViewed } from '@/lib/services/user-lists';

export async function POST(req: NextRequest) {
  const { user, error } = await requireApiUser();
  if (!user) return error;

  try {
    const dbUser = await getDbUser(user);
    const { movieId, title, image, year } = await req.json();

    if (!movieId || !title) {
      return NextResponse.json({ error: 'movieId and title are required' }, { status: 400 });
    }

    await recordRecentlyViewed(dbUser._id.toString(), {
      movieId,
      title,
      image: image ?? '',
      year: year ?? '',
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Error recording recently viewed:', err);
    return NextResponse.json({ error: 'Error recording recently viewed' }, { status: 500 });
  }
}
