import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { SmoothScroll } from '@/components/providers/smooth-scroll'
import { Reveal } from '@/components/common/reveal'
import { MagneticText } from '@/components/ui/magnetic-text'
import { PublicationArchive } from '@/components/publications/publication-archive'
import { profile } from '@/content/site'
import { publications } from '@/content/projects'

export const metadata: Metadata = {
  title: 'Writing — Papers & Preprints',
  description:
    'Peer-reviewed papers and preprints by Gilang Pratama Putra Siswanto on instrumentation, sensor networks, estimation, and computational physics.',
}

const stats = [
  { label: 'Total entries', value: String(publications.length) },
  { label: 'Journal papers', value: String(publications.filter((p) => p.type === 'Journal').length) },
  { label: 'Conference', value: String(publications.filter((p) => p.type === 'Conference').length) },
  { label: 'Books', value: String(publications.filter((p) => p.type === 'Book').length) },
]

export default function PublicationsPage() {
  return (
    <SmoothScroll>
      <PageHeader />
      <main id="main" className="min-h-screen pt-32">
        <section className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Writing & Research
            </p>
            <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <MagneticText
                text="Papers, preprints, and research output"
                hoverText="READ RESEARCH"
                className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
              />
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
              Selected peer-reviewed and open publications across instrumentation,
              sensor networks, estimation, and computational physics. Expand any entry
              for the abstract and citation.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[3px] border border-border bg-border sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-card p-5">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {s.label}
                  </dt>
                  <dd className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-foreground">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="mt-14">
            <PublicationArchive />
          </div>
        </section>
      </main>
      <SiteFooter />
      <span className="sr-only">{profile.name}</span>
    </SmoothScroll>
  )
}
