'use client';

import Link from 'next/link';
import { useUser, UserButton } from '@clerk/nextjs';

export default function HeaderAuth() {
  const { isLoaded, isSignedIn } = useUser();

  if (isLoaded && isSignedIn) {
    return (
      <>
        <Link
          href="/favorites"
          className="hidden text-sm font-semibold text-foreground transition hover:text-red-400 md:inline"
        >
          Favorites
        </Link>
        <div className="hidden md:block">
          <UserButton
            appearance={{
              elements: { avatarBox: 'h-10 w-10' },
            }}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Link
        href="/sign-in"
        className="hidden rounded-xl border border-red-500/40 px-5 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-600 hover:text-white md:inline-block"
      >
        Sign In
      </Link>
      <Link
        href="/sign-up"
        className="hidden rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700 md:inline-block"
      >
        Sign Up
      </Link>
    </>
  );
}

export function HeaderAuthMobile({ onNavigate }: { onNavigate?: () => void }) {
  const { isLoaded, isSignedIn } = useUser();

  if (isLoaded && isSignedIn) {
    return (
      <>
        <Link
          href="/favorites"
          onClick={onNavigate}
          className="text-sm font-medium text-foreground transition hover:text-red-400"
        >
          Favorites
        </Link>
        <UserButton
          appearance={{
            elements: { avatarBox: 'h-10 w-10' },
          }}
        />
      </>
    );
  }

  return (
    <div className="flex items-center gap-4 pt-2">
      <Link
        href="/sign-in"
        onClick={onNavigate}
        className="rounded-xl border border-red-500/40 px-5 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-600 hover:text-white"
      >
        Sign In
      </Link>
      <Link
        href="/sign-up"
        onClick={onNavigate}
        className="rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        Sign Up
      </Link>
    </div>
  );
}
