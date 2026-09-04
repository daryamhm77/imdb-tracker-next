import Button from '@/components/ui/Button';

export default function StatusPage({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      {eyebrow && <p className="text-8xl font-black text-red-600">{eyebrow}</p>}
      <h1 className="mt-4 text-2xl font-bold text-foreground md:text-4xl">{title}</h1>
      {description && <p className="mt-3 max-w-md text-muted">{description}</p>}
      <div className="mt-8">
        {action ?? <Button href="/" variant="accent" size="sm">Back Home</Button>}
      </div>
    </div>
  );
}
