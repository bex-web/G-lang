import { Reveal, RevealGroup, revealItem } from '@/components/common/reveal'
import { profile } from '@/content/site'
import { MotionItem } from '@/components/common/motion-item'

export function Identity() {
  return (
    <section
      id="identity"
      className="relative border-t border-border py-24 md:py-32"
      aria-label="Identity"
    >
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal">
            [ 00 ] — Identity
          </p>
          <p className="mt-6 font-mono text-sm leading-relaxed text-muted-foreground">
            {profile.status}
          </p>
        </Reveal>

        <div className="md:col-span-8">
          <Reveal>
            <p className="text-balance text-2xl font-light leading-snug tracking-tight sm:text-3xl md:text-4xl">
              <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground bg-clip-text text-transparent">
                {profile.intro}
              </span>
            </p>
          </Reveal>

          <RevealGroup className="mt-10 space-y-5 border-l border-border pl-6">
            {profile.bioLong.map((para) => (
              <MotionItem
                key={para}
                variants={revealItem}
                as="p"
                className="max-w-2xl text-pretty leading-relaxed text-muted-foreground"
              >
                {para}
              </MotionItem>
            ))}
          </RevealGroup>
        </div>
        </div>
      </div>
    </section>
  )
}
