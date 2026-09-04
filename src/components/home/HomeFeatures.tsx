import FeatureGrid from '@/components/marketing/FeatureGrid';
import Section, { SectionHeader } from '@/components/ui/Section';
import { homeFeatures } from '@/content/home';

export default function HomeFeatures() {
  return (
    <Section tone="muted" divided className="py-24">
      <SectionHeader
        align="center"
        title="Built for"
        highlight="movie lovers"
        description="Everything you need to turn casual watching into a curated collection you're proud of."
      />
      <FeatureGrid items={homeFeatures} />
    </Section>
  );
}
