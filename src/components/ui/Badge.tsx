import { cn } from '@/lib/cn';

const tones = {
  red: 'border-red-500/30 bg-red-600/20 text-red-400',
  amber: 'bg-amber-500/20 text-amber-400',
  muted: 'border-card-border text-muted',
} as const;

export default function Badge({
  children,
  tone = 'red',
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
