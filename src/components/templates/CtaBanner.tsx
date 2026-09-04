import Container from '@/components/ui/Container';
import Surface from '@/components/ui/Surface';

export default function CtaBanner({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions: React.ReactNode;
}) {
  return (
    <section className="relative border-t border-card-border py-20">
      <Container width="sm" className="text-center">
        <Surface variant="panel" className="border-red-500/20 from-red-100 p-12 dark:from-red-950/40">
          <h2 className="text-3xl font-black md:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-md text-muted">{description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">{actions}</div>
        </Surface>
      </Container>
    </section>
  );
}
