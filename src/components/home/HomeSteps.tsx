import StepGrid from '@/components/marketing/StepGrid';
import Section, { SectionHeader } from '@/components/ui/Section';
import { homeSteps } from '@/content/home';

export default function HomeSteps() {
  return (
    <Section className="py-24">
      <SectionHeader align="center" title="Three steps to" highlight="cinematic clarity" />
      <StepGrid items={homeSteps} />
    </Section>
  );
}
