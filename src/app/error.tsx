'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-500/10 p-5">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
        </div>

        <h1 className="mb-3 text-4xl font-bold text-foreground">
          Oops! Something went wrong.
        </h1>

        <p className="mb-8 text-muted">
          We couldn&apos;t load this page. It might be a temporary issue with the
          server or your connection.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button variant="accent" size="sm" onClick={reset} className="gap-2">
            <RefreshCw size={18} />
            Try Again
          </Button>
          <Button href="/" variant="ghost" size="sm" className="gap-2">
            <Home size={18} />
            Back Home
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <pre className="mt-8 overflow-auto rounded-lg bg-card p-4 text-left text-xs text-red-400">
            {error.message}
          </pre>
        )}
      </div>
    </main>
  );
}