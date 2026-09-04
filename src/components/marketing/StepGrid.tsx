export type StepItem = {
  step: string;
  title: string;
  description: string;
};

export default function StepGrid({ items }: { items: StepItem[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.step} className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-100 text-2xl font-black text-red-600 dark:bg-red-950/30 dark:text-red-500">
            {item.step}
          </div>
          <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
          <p className="text-muted">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
