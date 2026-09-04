import { Suspense } from 'react';
import Badge from '@/components/ui/Badge';
import GradientText from '@/components/ui/GradientText';
import Section from '@/components/ui/Section';
import Skeleton from '@/components/ui/Skeleton';
import Surface from '@/components/ui/Surface';
import AuthActions from '@/components/marketing/AuthActions';
import HomeHeroPersonal from '@/components/home/HomeHeroPersonal';
import { homeStats } from '@/content/home';

export default function HomeHero() {
  return (
    <Section className="pb-24 pt-16 md:pt-24">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-100 px-4 py-1.5 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            Your cinema journey starts here
          </div>

          <h1 className="text-5xl font-black leading-[1.1] tracking-tight md:text-7xl">
            Every film you watch, <GradientText>remembered.</GradientText>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            IMDb Tracker is your personal movie companion — log watches, rate
            favorites, and uncover insights about your viewing habits. Like a
            letterboxd for power users, built with modern tech.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <AuthActions
              signedOutLabel="Start Tracking Free"
              signedInLabel="Go to Dashboard"
              secondary={{ href: '/about', label: 'Learn More' }}
            />
          </div>

          <div className="mt-12 flex items-center gap-8 text-sm text-muted">
            {homeStats.map((stat, index) => (
              <div key={stat.label} className="contents">
                {index > 0 && <div className="h-8 w-px bg-card-border" />}
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-red-600/20 to-transparent blur-2xl" />
          <Surface variant="panel" className="relative p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-muted">Your Watchlist</p>
              <Badge>This Month</Badge>
            </div>
            <div className="space-y-3">
              <Suspense fallback={<Skeleton count={3} className="h-20" />}>
                <HomeHeroPersonal />
              </Suspense>
            </div>
          </Surface>
        </div>
      </div>
    </Section>
  );
}
