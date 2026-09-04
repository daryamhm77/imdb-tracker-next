import { cn } from '@/lib/cn';

export default function EmptyState({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn('px-4 pt-10 text-center', className)}>
      <h2 className="text-2xl font-semibold text-muted">{title}</h2>
      {description && <p className="mt-2 text-sm text-muted">{description}</p>}
    </div>
  );
}
