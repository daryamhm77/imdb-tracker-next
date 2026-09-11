'use client';

import { useUser } from '@clerk/nextjs';
import Button from '@/components/ui/Button';

export default function AuthActions({
  signedOutLabel,
  signedInLabel = 'Go to Dashboard',
  secondary,
}: {
  signedOutLabel: string;
  signedInLabel?: string;
  secondary?: { href: string; label: string };
}) {
  const { isLoaded, isSignedIn } = useUser();

  if (isLoaded && isSignedIn) {
    return (
      <Button href="/dashboard" size="lg">
        {signedInLabel}
      </Button>
    );
  }

  return (
    <>
      <Button href="/sign-up" size="lg">
        {signedOutLabel}
      </Button>
      {secondary && (
        <Button href={secondary.href} variant="secondary" size="lg">
          {secondary.label}
        </Button>
      )}
    </>
  );
}
