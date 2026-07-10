import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { SmoothScroll } from '@/components/providers/smooth-scroll'
import { Reveal } from '@/components/common/reveal'
import { ProjectGallery } from '@/components/projects/project-gallery'
import { projects, getProject, getAdjacentProjects } from '@/content/projects'
import { profile, contact } from '@/content/site'
import { cn } from '@/lib/utils'

const statusStyle = {
  active: 'text-foreground border-border-strong bg-card',
  archived: 'text-muted-foreground border-border bg-muted/40',
  prototype: 'text-foreground border-border bg-card',
} as const

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: 'Project not found' }
  return {
    title: `${project.title} — Work`,
    description: project.summary,
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const { prev, next } = getAdjacentProjects(slug)

  return (
    <SmoothScroll>
      <PageHeader />
      <main id="main" className="min-h-screen pt-32">
        <article className="mx-auto max-w-4xl px-6 pb-24 md:pb-32">
          <Reveal>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              All work
            </Link>
          </Reveal>

          {/* header */}
          <Reveal delay={0.05}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {project.index}
              </span>
              <span
                className={cn(
                  'rounded-[2px] border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em]',
                  statusStyle[project.status],
                )}
              >
                {project.status}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {project.category} · {project.year}
              </span>
            </div>
            <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
          </Reveal>

          {/* meta grid */}
          <Reveal delay={0.1}>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[3px] border border-border bg-border sm:grid-cols-4">
              {[
                { label: 'Role', value: project.role },
                { label: 'Timeframe', value: project.timeframe },
                { label: 'Domain', value: project.category },
                { label: 'Status', value: project.status },
              ].map((item) => (
                <div key={item.label} className="bg-card p-5">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-sm font-medium leading-snug text-foreground">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* key metrics */}
          <Reveal delay={0.1}>
            <dl className="mt-5 grid grid-cols-3 gap-5 border-y border-border py-8">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {m.label}
                  </dt>
                  <dd className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-foreground sm:text-3xl">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Hero image */}
          {project.thumbnail && (
            <Reveal delay={0.1}>
              <div className="relative mt-10 h-72 w-full overflow-hidden rounded-[3px] border border-border sm:h-96">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
            </Reveal>
          )}

          {/* overview */}
          <Reveal delay={0.05}>
            <section className="mt-14" aria-labelledby="overview-heading">
              <h2
                id="overview-heading"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
              >
                Overview
              </h2>
              <div className="mt-5 space-y-5">
                {project.overview.map((p, i) => (
                  <p key={i} className="text-pretty leading-relaxed text-foreground/90">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          </Reveal>

          {/* challenge */}
          <Reveal delay={0.05}>
            <section className="mt-12 rounded-[3px] border border-border bg-card/50 p-7" aria-labelledby="challenge-heading">
              <h2
                id="challenge-heading"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
              >
                The Challenge
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-foreground/90">
                {project.challenge}
              </p>
            </section>
          </Reveal>

          {/* approach + outcomes */}
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <Reveal delay={0.05}>
              <section aria-labelledby="approach-heading">
                <h2
                  id="approach-heading"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Approach
                </h2>
                <ul className="mt-5 space-y-4">
                  {project.approach.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                      <span className="mt-1 select-none text-xs font-semibold tabular-nums text-muted-foreground">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-pretty">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal delay={0.1}>
              <section aria-labelledby="outcomes-heading">
                <h2
                  id="outcomes-heading"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Outcomes
                </h2>
                <ul className="mt-5 space-y-4">
                  {project.outcomes.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                      <span className="text-pretty">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          </div>

          {/* stack */}
          <Reveal delay={0.05}>
            <section className="mt-12" aria-labelledby="stack-heading">
              <h2
                id="stack-heading"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
              >
                Stack
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                {project.stack.map((group) => (
                  <div key={group.group} className="rounded-[3px] border border-border bg-card/50 p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                      {group.group}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {group.items.map((item) => (
                        <li key={item} className="text-sm text-foreground/90">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* Gallery */}
          {project.gallery && project.gallery.length > 1 && (
            <Reveal delay={0.05}>
              <section aria-labelledby="gallery-heading" className="mt-14">
                <h2
                  id="gallery-heading"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Gallery
                </h2>
                <ProjectGallery images={project.gallery} title={project.title} />
              </section>
            </Reveal>
          )}

          {/* links */}
          {project.links && project.links.length > 0 ? (
            <Reveal delay={0.05}>
              <div className="mt-10 flex flex-wrap gap-3">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-[2px] border border-border-strong px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-foreground"
                  >
                    {l.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </Reveal>
          ) : null}

          {/* contact CTA */}
          <Reveal delay={0.05}>
            <section className="mt-16 rounded-[3px] border border-border bg-card/50 p-8 text-center">
              <h2 className="text-balance text-2xl font-semibold tracking-tight">
                Interested in a build like this?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
                I take on instrumentation, embedded, and computational physics work.
                Let&apos;s talk about your measurement problem.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={contact.emailHref}
                  className="inline-flex items-center gap-2 rounded-[2px] bg-signal px-6 py-3 text-sm font-semibold text-signal-foreground transition-transform hover:-translate-y-0.5"
                >
                  Email me
                </a>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-[2px] border border-border-strong px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground"
                >
                  WhatsApp
                </a>
              </div>
            </section>
          </Reveal>

          {/* prev / next */}
          <nav
            className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
            aria-label="Project navigation"
          >
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="group flex flex-col gap-1 rounded-[3px] border border-border bg-card/40 p-5 transition-colors hover:border-border-strong"
              >
                <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Previous
                </span>
                <span className="text-sm font-medium text-foreground transition-colors group-hover:text-foreground">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group flex flex-col gap-1 rounded-[3px] border border-border bg-card/40 p-5 text-right transition-colors hover:border-border-strong sm:items-end"
              >
                <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Next
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-medium text-foreground">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
          </nav>
        </article>
      </main>
      <SiteFooter />
      <span className="sr-only">{profile.name}</span>
    </SmoothScroll>
  )
}
