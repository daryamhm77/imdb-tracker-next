import Link from 'next/link';
import { cn } from '@/lib/cn';

const variants = {
  primary:
    'bg-red-600 text-white shadow-[0_0_40px_rgba(239,68,68,0.35)] hover:bg-red-500',
  secondary:
    'border border-card-border text-foreground hover:border-red-500/40',
  accent: 'bg-amber-500 font-semibold text-black hover:bg-amber-400',
  ghost: 'border border-card-border text-foreground hover:border-amber-500 hover:text-amber-500',
} as const;

const sizes = {
  sm: 'rounded-lg px-4 py-2 text-sm',
  md: 'rounded-2xl px-8 py-3 text-base font-bold',
  lg: 'rounded-2xl px-8 py-4 text-base font-bold',
} as const;

type ButtonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center transition',
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
