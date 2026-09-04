import { cn } from '@/lib/cn';

export default function Skeleton({
  className,
  count = 1,
}: {
  className?: string;
  count?: number;
}) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={cn('animate-pulse rounded-2xl bg-card', className)} />
      ))}
    </>
  );
}
