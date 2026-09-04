import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function requireApiUser() {
  const user = await currentUser();
  if (!user) {
    return {
      user: null,
      error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }
  return { user, error: null };
}
