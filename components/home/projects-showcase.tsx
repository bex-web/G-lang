'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/common/section-heading'
import ExpandOnHover, { type ExpandCard } from '@/components/ui/expand-cards'
import { projects } from '@/content/projects'

export function ProjectsShowcase() {
  // Pick first 9 projects (stable selection to avoid hydration mismatch)
  const selectedProjects = useMemo(() => {
    return projects.slice(0, 9).map((p) => ({
      slug: p.slug,
      title: p.title,
      tags: p.tags,
      thumbnail: p.thumbnail || '/placeholder.png',
      overview: p.overview,
    })) as ExpandCard[]
  }, [])

  return (
    <section
      id="projects"
      className="relative border-t border-border py-24 md:py-32"
      aria-label="Projects"
    >
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <SectionHeading
          code="05 · Still hungry, stay 73.86%"
          title="Project & Development"
          description="We seek some science, human, and machines. Then these works happen.ed. "
          inverse
          magnetic
          hoverText="EXPLORE"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mt-14"
        >
          <ExpandOnHover cards={selectedProjects} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {selectedProjects.length} of {projects.length} systems shown
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
