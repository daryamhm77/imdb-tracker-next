export default function MarketingPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-red-600/10 blur-[120px]" />
        <div className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-amber-500/5 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-red-900/10 blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, currentColor 0px, currentColor 8px, transparent 8px, transparent 24px)',
          }}
        />
      </div>
      {children}
    </div>
  );
}
