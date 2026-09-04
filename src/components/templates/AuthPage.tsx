export default function AuthPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center p-3">
      {children}
    </div>
  );
}
