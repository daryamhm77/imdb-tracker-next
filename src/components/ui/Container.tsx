import { cn } from '@/lib/cn';

const widths = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
} as const;

export default function Container({
  children,
  width = 'xl',
  className,
}: {
  children: React.ReactNode;
  width?: keyof typeof widths;
  className?: string;
}) {
  return (
    <div className={cn('relative mx-auto px-4 sm:px-6', widths[width], className)}>
      {children}
    </div>
  );
}
