import { cn } from '@/lib/cn';

const variants = {
  card: 'rounded-2xl border border-card-border bg-card',
  panel: 'rounded-3xl border border-card-border bg-gradient-to-br from-card to-background',
  dashed: 'rounded-2xl border border-dashed border-card-border',
} as const;

export default function Surface({
  children,
  variant = 'card',
  className,
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return <div className={cn(variants[variant], className)}>{children}</div>;
}
