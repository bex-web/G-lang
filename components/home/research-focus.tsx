'use client'

import { Radar, Cpu, Sigma, Waves, type LucideIcon } from 'lucide-react'
import { SectionHeading } from '@/components/common/section-heading'
import { RevealGroup, revealItem } from '@/components/common/reveal'
import { MotionItem } from '@/components/common/motion-item'
import { researchFocus, type ResearchFocusItem } from '@/content/site'

const iconMap: Record<ResearchFocusItem['icon'], LucideIcon> = {
  Radar,
  Cpu,
  Sigma,
  Waves,
}

export function ResearchFocus() {
  const items = [...researchFocus].sort((a, b) => a.order - b.order)

  return (
    <section
      id="focus"
      className="relative border-t border-border py-24 md:py-32"
      aria-label="Research focus"
    >
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <SectionHeading
          code="02 · Research Focus"
          title="Four converging disciplines"
          description="Distinct lines of inquiry that share one substrate: turning physical phenomena into reliable signals and decisions."
          inverse
          magnetic
          hoverText="DISCIPLINES"
        />

        <RevealGroup className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-4">
          {items.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <MotionItem
                key={item.code}
                variants={revealItem}
                as="article"
                className="group flex flex-col items-center text-center cursor-pointer"
                data-cursor="hover"
                tabIndex={0}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-border-strong bg-card shadow-md transition-all duration-700 ease-in-out will-change-transform group-hover:-translate-y-4 group-hover:scale-125 group-hover:border-foreground group-hover:bg-foreground group-hover:shadow-2xl">
                  <Icon
                    className="h-6 w-6 text-muted-foreground transition-all duration-700 ease-in-out will-change-transform group-hover:scale-125 group-hover:text-background"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>

                <span className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-all duration-700 ease-in-out group-hover:text-foreground group-hover:scale-110">
                  {item.code}
                </span>
                <h3 className="mt-1 text-base font-semibold tracking-tight text-foreground transition-all duration-700 ease-in-out will-change-transform group-hover:scale-110">
                  {item.label}
                </h3>

                {/* Hover / focus caption */}
                <p className="mt-2 max-w-[22ch] text-pretty text-xs leading-relaxed text-muted-foreground opacity-0 transition-all duration-700 ease-in-out will-change-transform group-hover:translate-y-2 group-hover:opacity-100">
                  {item.hover}
                </p>
              </MotionItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
