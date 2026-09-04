import Container from '@/components/ui/Container';

export default function AppPage({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Container className="py-8">
      {title && <h1 className="mb-8 text-3xl font-bold text-foreground">{title}</h1>}
      {children}
    </Container>
  );
}
