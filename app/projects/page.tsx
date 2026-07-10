import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { SmoothScroll } from '@/components/providers/smooth-scroll'
import { Reveal } from '@/components/common/reveal'
import { MagneticText } from '@/components/ui/magnetic-text'
import { ProjectGrid } from '@/components/projects/project-grid'
import { profile } from '@/content/site'

export const metadata: Metadata = {
  title: 'Work — Instruments & Systems',
  description:
    'Selected engineering and research projects by Gilang Pratama Putra Siswanto, spanning precision instrumentation, control systems, computational physics, and networked sensing.',
}

export default function ProjectsPage() {
  return (
    <SmoothScroll>
      <PageHeader />
      <main id="main" className="min-h-screen pt-32">
        <section className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Selected Work
            </p>
            <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <MagneticText
                text="Instruments, systems, and the physics behind them"
                hoverText="EXPLORE PROJECTS"
                className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
              />
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
              A catalogue of builds where measurement principles become hardware,
              firmware, and analysis. Filter by domain, or open any project for the
              full engineering story.
            </p>
          </Reveal>

          <div className="mt-14">
            <ProjectGrid />
          </div>
        </section>
      </main>
      <SiteFooter />
      <span className="sr-only">{profile.name}</span>
    </SmoothScroll>
  )
}
