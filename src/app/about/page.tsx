import MarketingPage from '@/components/templates/MarketingPage';
import CtaBanner from '@/components/templates/CtaBanner';
import AuthActions from '@/components/marketing/AuthActions';
import FeatureGrid from '@/components/marketing/FeatureGrid';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import GradientText from '@/components/ui/GradientText';
import Section, { SectionHeader } from '@/components/ui/Section';
import Surface from '@/components/ui/Surface';
import { aboutRoadmap, aboutTech, aboutValues } from '@/content/about';

export const dynamic = 'force-static';

export const metadata = {
  title: 'About Us | IMDb Tracker',
  description:
    'Learn about IMDb Tracker — the personal movie logging and analytics app for film enthusiasts.',
};

export default function AboutPage() {
  return (
    <MarketingPage>
      <Section width="md" className="pb-16 pt-16 text-center md:pt-24">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-red-400">
          About IMDb Tracker
        </p>
        <h1 className="text-4xl font-black leading-tight md:text-6xl">
          Your personal <GradientText>film archive</GradientText>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          IMDb Tracker helps movie lovers log what they watch, rate their
          favorites, and understand their viewing habits through beautiful
          analytics. Think of it as a digital scrapbook for your cinematic life
          — powered by modern web technology.
        </p>
      </Section>

      <Section divided className="py-20">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black md:text-4xl">Our Mission</h2>
            <p className="mt-6 leading-relaxed text-muted">
              Streaming has made more films accessible than ever, but it&apos;s
              also easier to forget what you&apos;ve seen. IMDb Tracker exists
              to solve that — giving every viewer a persistent, searchable
              record of their film journey.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Whether you&apos;re a casual weekend watcher or a dedicated
              cinephile chasing a 100-film year, our tools adapt to how{' '}
              <em>you</em> watch. Log films in seconds, revisit your ratings,
              and let the charts tell the story of your taste over time.
            </p>
          </div>
          <Surface variant="panel" className="p-8">
            <div className="mb-6 text-6xl">🎬</div>
            <blockquote className="text-xl font-medium leading-relaxed text-foreground">
              &ldquo;The best movie tracker is the one you actually use. We
              designed every screen to be fast, dark, and distraction-free —
              like a theater before the lights dim.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm text-muted">— The IMDb Tracker Team</p>
          </Surface>
        </div>
      </Section>

      <Section tone="muted" divided className="py-20">
        <SectionHeader align="center" title="What We Stand For" />
        <FeatureGrid items={aboutValues} columns={3} />
      </Section>

      <Section className="py-20">
        <SectionHeader
          align="center"
          title="Built With"
          description="A modern, production-ready stack chosen for speed, security, and scalability."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aboutTech.map((tech) => (
            <Surface key={tech.name} className="flex items-center gap-4 px-6 py-4">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <div>
                <p className="font-semibold">{tech.name}</p>
                <p className="text-sm text-muted">{tech.role}</p>
              </div>
            </Surface>
          ))}
        </div>
      </Section>

      <section className="relative border-t border-card-border py-20">
        <Container width="sm" className="text-center">
          <h2 className="text-3xl font-black md:text-4xl">What&apos;s Next</h2>
          <p className="mt-4 text-muted">
            We&apos;re actively building out the core experience. Here&apos;s
            what&apos;s on the horizon:
          </p>
          <ul className="mt-8 space-y-3 text-left">
            {aboutRoadmap.map((item) => (
              <li key={item}>
                <Surface className="flex items-center gap-3 px-5 py-3 text-sm">
                  <span className="text-red-400">→</span>
                  {item}
                </Surface>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBanner
        title="Ready to start your log?"
        description="Create a free account and begin tracking today."
        actions={
          <>
            <AuthActions signedOutLabel="Sign Up Free" />
            <Button href="/" variant="secondary" size="lg">
              Back to Home
            </Button>
          </>
        }
      />
    </MarketingPage>
  );
}
