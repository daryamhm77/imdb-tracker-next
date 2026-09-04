import type { DashboardStats } from '@/lib/dashboard';

export default function UserStats({ stats }: { stats: DashboardStats }) {
  const display = [
    { label: 'Watched', value: String(stats.totalWatched) },
    { label: 'Avg Rating', value: stats.avgRating ?? '—' },
    { label: 'Watchlist', value: String(stats.totalWatchlist) },
  ];

  return (
    <div className="mt-6 grid grid-cols-3 gap-3">
      {display.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-card-border bg-card p-3 text-center"
        >
          <p className="text-lg font-bold text-red-600 dark:text-red-400">
            {stat.value}
          </p>
          <p className="text-xs text-muted">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
