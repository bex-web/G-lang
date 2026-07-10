import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Hero } from '@/components/home/hero'
import { Identity } from '@/components/home/identity'
import { CurrentPositions } from '@/components/home/current-positions'
import { ResearchFocus } from '@/components/home/research-focus'
import { NodeGraph } from '@/components/home/node-graph'
import { Timeline } from '@/components/home/timeline'
import { ProjectsShowcase } from '@/components/home/projects-showcase'
import { PublicationsStack } from '@/components/home/publications-stack'
import { StatisticsSlider } from '@/components/home/statistics-slider'
import { ConnectBoxy } from '@/components/home/connect-boxy'
import { profile, socials } from '@/content/site'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.title,
  description: profile.intro,
  address: {
    '@type': 'PostalAddress',
    addressLocality: profile.location,
  },
  knowsAbout: [
    'Physics',
    'Scientific Instrumentation',
    'Embedded Systems',
    'IoT',
    'Computational Physics',
    'Robotics',
    'Applied AI',
  ],
  sameAs: socials
    .filter((s) => s.kind !== 'email')
    .map((s) => s.href),
}

export default function Page() {
  return (
    <div id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Identity />
        <CurrentPositions />
        <ResearchFocus />
        <NodeGraph />
        <Timeline />
        <ProjectsShowcase />
        <PublicationsStack />
        <StatisticsSlider />
        <ConnectBoxy />
      </main>
      <SiteFooter />
    </div>
  )
}
