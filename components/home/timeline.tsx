'use client'

import { SectionHeading } from '@/components/common/section-heading'
import StackingCard, { type ProjectCard } from '@/components/ui/stacking-card'
import { timeline } from '@/content/specialities'

// Map timeline entries to stacking card format with laboratory log images
const labProjects: ProjectCard[] = timeline.map((entry, index) => {
  // Determine file extension based on index
  const extensions = ['png', 'jfif', 'jfif', 'png', 'jpg', 'png']
  const ext = extensions[index] || 'png'
  
  return {
    code: entry.code,
    title: entry.title,
    org: entry.org,
    year: entry.year,
    description: entry.description,
    link: `/images/laboratory_log/${index + 1}.${ext}`,
  }
})

export function Timeline() {
  return (
    <section
      id="timeline"
      className="relative border-t border-border py-24 md:py-32"
      aria-label="Laboratory timeline"
    >
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <SectionHeading
          code="04 · The tale"
          title="This is where the tale begin"
          description="Experiments, builds, and milestones | captured and defining these sequences."
          inverse
        />

        <div className="mt-16">
          <StackingCard projects={labProjects} />
        </div>
      </div>
    </section>
  )
}
