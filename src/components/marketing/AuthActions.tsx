'use client';

import { SignedIn, SignedOut, SignUpButton } from '@clerk/nextjs';
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
  return (
    <>
      <SignedOut>
        <SignUpButton mode="modal">
          <Button size="lg">{signedOutLabel}</Button>
        </SignUpButton>
        {secondary && (
          <Button href={secondary.href} variant="secondary" size="lg">
            {secondary.label}
          </Button>
        )}
      </SignedOut>
      <SignedIn>
        <Button href="/dashboard" size="lg">
          {signedInLabel}
        </Button>
      </SignedIn>
    </>
  );
}
