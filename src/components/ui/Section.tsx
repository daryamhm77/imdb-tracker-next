import { cn } from '@/lib/cn';
import Container from './Container';

type SectionProps = {
  children: React.ReactNode;
  tone?: 'plain' | 'muted';
  divided?: boolean;
  className?: string;
  width?: 'sm' | 'md' | 'lg' | 'xl';
};

export default function Section({
  children,
  tone = 'plain',
  divided = false,
  className,
  width = 'xl',
}: SectionProps) {
  return (
    <section
      className={cn(
        'relative',
        tone === 'muted' && 'bg-card/40',
        divided && 'border-t border-card-border',
        className
      )}
    >
      <Container width={width}>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  title,
  highlight,
  description,
  action,
  align = 'left',
}: {
  title: React.ReactNode;
  highlight?: string;
  description?: string;
  action?: React.ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={cn(
        'mb-10',
        align === 'center' && 'text-center',
        action ? 'flex items-end justify-between gap-4 text-left' : undefined
      )}
    >
      <div>
        <h2 className="text-2xl font-black md:text-4xl">
          {title}
          {highlight && <span className="text-red-500"> {highlight}</span>}
        </h2>
        {description && (
          <p className={cn('mt-4 text-muted', align === 'center' && 'mx-auto max-w-xl')}>
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
