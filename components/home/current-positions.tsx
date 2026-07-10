import { SectionHeading } from '@/components/common/section-heading'
import { RevealGroup, revealItem } from '@/components/common/reveal'
import { MotionItem } from '@/components/common/motion-item'
import { positions } from '@/content/site'

export function CurrentPositions() {
  return (
    <section
      className="relative border-t border-border py-24 md:py-32"
      aria-label="Current positions"
    >
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <SectionHeading
          code="01 · Current Positions"
          title="Active appointments"
          description="Where the work happens — across research, independent development, and collaboration."
          inverse
        />

        <RevealGroup className="mt-14 divide-y divide-border border-y border-border">
          {positions.map((pos) => (
            <MotionItem
              key={pos.role}
              variants={revealItem}
              as="article"
              className="group grid gap-4 py-7 transition-all duration-300 hover:bg-card/80 hover:shadow-sm md:grid-cols-12 md:items-center md:gap-6 md:px-4 md:hover:scale-[1.01]"
            >
              <div className="md:col-span-2">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
                  {pos.type}
                </span>
              </div>
              <div className="md:col-span-6">
                <h3 className="text-lg font-medium tracking-tight transition-colors group-hover:text-signal">
                  {pos.role}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{pos.summary}</p>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="text-sm text-foreground">{pos.org}</p>
              </div>
              <div className="md:col-span-1 md:text-right">
                <p className="font-mono text-xs tabular-nums text-muted-foreground">
                  {pos.period}
                </p>
              </div>
            </MotionItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
