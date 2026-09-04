import Surface from '@/components/ui/Surface';
import { cn } from '@/lib/cn';

export type FeatureItem = {
  icon: string;
  title: string;
  description: string;
};

export default function FeatureGrid({
  items,
  columns = 4,
}: {
  items: FeatureItem[];
  columns?: 3 | 4;
}) {
  return (
    <div
      className={cn(
        'grid gap-6 sm:grid-cols-2',
        columns === 4 ? 'lg:grid-cols-4' : 'md:grid-cols-3'
      )}
    >
      {items.map((item) => (
        <Surface
          key={item.title}
          className="group p-6 transition hover:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-950/10"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/10 text-2xl transition group-hover:scale-110">
            {item.icon}
          </div>
          <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
          <p className="text-sm leading-relaxed text-muted">{item.description}</p>
        </Surface>
      ))}
    </div>
  );
}
