import { Counter } from '@/components/common/counter'
import { RevealGroup, revealItem } from '@/components/common/reveal'
import { MotionItem } from '@/components/common/motion-item'
import { statistics } from '@/content/site'

export function Statistics() {
  return (
    <section
      className="relative border-t border-border py-24 md:py-28"
      aria-label="Research statistics"
    >
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
          {statistics.map((stat) => (
            <MotionItem
              key={stat.code}
              variants={revealItem}
              className="bg-card p-8 text-center"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                {stat.code}
              </p>
              <p className="mt-4 font-mono text-4xl font-light tabular-nums tracking-tight md:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{stat.label}</p>
            </MotionItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
