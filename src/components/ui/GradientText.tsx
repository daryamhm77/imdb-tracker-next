export default function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-red-400 via-red-500 to-amber-400 bg-clip-text text-transparent">
      {children}
    </span>
  );
}
