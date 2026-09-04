import { Suspense } from 'react';
import MarketingPage from '@/components/templates/MarketingPage';
import HomeHero from '@/components/home/HomeHero';
import HomeMovieGrid from '@/components/home/HomeMovieGrid';
import HomeRecommendations from '@/components/home/HomeRecommendations';
import HomeFeatures from '@/components/home/HomeFeatures';
import HomeSteps from '@/components/home/HomeSteps';
import HomeCta from '@/components/home/HomeCta';
import Loader from '@/components/ui/Loader';

export default function Home() {
  return (
    <MarketingPage>
      <HomeHero />
      <Suspense fallback={<Loader message="Loading trending..." />}>
        <HomeMovieGrid />
      </Suspense>
      <Suspense fallback={null}>
        <HomeRecommendations />
      </Suspense>
      <HomeFeatures />
      <HomeSteps />
      <HomeCta />
    </MarketingPage>
  );
}
