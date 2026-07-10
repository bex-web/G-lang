import { SectionHeading } from '@/components/common/section-heading'
import { RevealGroup, revealItem } from '@/components/common/reveal'
import { MotionItem } from '@/components/common/motion-item'
import { techStack } from '@/content/specialities'

export function TechStack() {
  return (
    <section
      className="relative border-t border-border py-24 md:py-32"
      aria-label="Technology stack"
    >
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <SectionHeading
          code="07 · Instrument Panel"
          title="Tools of the trade"
          description="The hardware and software substrate behind every experiment and build."
          inverse
          magnetic
          hoverText="TOOLKIT"
        />

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {techStack.map((cat) => (
            <MotionItem
              key={cat.code}
              variants={revealItem}
              className="bg-card p-7 transition-all duration-300 hover:bg-card/80 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium tracking-tight">{cat.name}</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                  {cat.code}
                </span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-background/40 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-signal/50 hover:text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </MotionItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
