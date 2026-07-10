'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/common/section-heading'
import { RevealGroup, revealItem } from '@/components/common/reveal'
import { MotionItem } from '@/components/common/motion-item'
import { projects, type Project } from '@/content/projects'
import { cn } from '@/lib/utils'

const statusStyle: Record<Project['status'], string> = {
  active: 'text-foreground border-border-strong bg-card',
  archived: 'text-muted-foreground border-border bg-muted/40',
  prototype: 'text-foreground border-border bg-card',
}

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLAnchorElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  return (
    <MotionItem
      variants={revealItem}
      as="article"
      className="h-full"
    >
      <Link
        href={`/projects/${project.slug}`}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        onMouseMove={onMove}
        className="card-hover group relative flex h-full flex-col overflow-hidden rounded-[3px] border border-border bg-card/50 hover:border-border-strong"
      >
        {/* Thumbnail */}
        {project.thumbnail && (
          <div className="relative h-44 w-full shrink-0 overflow-hidden border-b border-border">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-background/20" />
          </div>
        )}

        {/* Radial spotlight follows pointer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(500px circle at var(--x) var(--y), oklch(0.94 0.02 90 / 0.06), transparent 55%)',
          }}
        />

        <div className="relative flex flex-1 flex-col p-7">
          <div className="flex items-center justify-between">
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
          </div>

          <div className="mt-6 flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold tracking-tight text-balance">
              {project.title}
            </h3>
            <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </div>

          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            {project.category} · {project.year}
          </p>

          <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
            {project.summary}
          </p>

          <dl className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-5">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  {m.label}
                </dt>
                <dd className="mt-1 text-sm font-medium tabular-nums text-foreground">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[2px] border border-border px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </MotionItem>
  )
}

export function ProjectsAtomic() {
  const [filter, setFilter] = useState<string>('all')
  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.category)))]
  const filtered =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section
      id="projects"
      className="relative border-t border-border py-24 md:py-32"
      aria-label="Projects"
    >
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            code="05 · Engineering Showcase"
            title="Instruments & systems"
            description="Selected builds spanning optics, control, computation, and networked sensing."
          />
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={filter === cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  'rounded-[2px] border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors',
                  filter === cat
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border text-muted-foreground hover:text-foreground',
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <RevealGroup
          key={filter}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </RevealGroup>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {filtered.length} of {projects.length} systems shown
          </p>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-[2px] border border-border-strong px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground"
          >
            View all work
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
