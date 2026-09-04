import Link from 'next/link';
import { cn } from '@/lib/cn';

export type TabItem = {
  href: string;
  label: string;
  active: boolean;
};

export default function Tabs({ items }: { items: TabItem[] }) {
  return (
    <div className="mb-6 flex gap-4 border-b border-card-border">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'pb-2 text-sm font-semibold transition',
            item.active
              ? 'border-b-2 border-red-500 text-red-400'
              : 'text-muted hover:text-foreground'
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
