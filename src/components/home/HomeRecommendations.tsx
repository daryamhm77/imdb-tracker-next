import { getHomePersonalData } from '@/lib/services/home';
import Recommendations from '@/components/movie/Recommendations';

export default async function HomeRecommendations() {
  const personal = await getHomePersonalData();
  if (!personal) return null;
  return <Recommendations movies={personal.recommendations} />;
}
