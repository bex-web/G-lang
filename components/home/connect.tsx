'use client'

import { AtSign, Link2, ExternalLink, Mail, MessageCircle, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/common/reveal'
import { ScrambleText } from '@/components/common/scramble-text'
import { profile, socials, contact } from '@/content/site'

const iconMap = {
  email: Mail,
  whatsapp: MessageCircle,
  linkedin: AtSign,
  github: Link2,
  instagram: ExternalLink,
} as const

export function Connect() {
  return (
    <section
      id="connect"
      className="grain relative overflow-hidden border-t border-border py-24 lab-grid md:py-36"
      aria-label="Contact"
    >
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              08 · Start a conversation
            </p>
            <h2 className="mt-6 text-balance text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
              <ScrambleText text="Let’s build" /> <br className="hidden sm:block" />
              something precise.
            </h2>
            <p className="mt-6 max-w-lg text-pretty leading-relaxed text-muted-foreground">
              Open to research collaboration, instrumentation and embedded work,
              robotics development, and technical writing. Email or WhatsApp me and
              let's discuss the problem.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={contact.emailHref}
                className="group inline-flex items-center gap-3 rounded-[2px] bg-signal px-6 py-3 text-sm font-semibold text-signal-foreground transition-transform hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" />
                {contact.email}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 rounded-[2px] border border-border-strong bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          <Reveal className="md:col-span-5" delay={0.15}>
            <ul className="divide-y divide-border rounded-[2px] border border-border bg-card/50">
              {socials.map((s) => {
                const Icon = iconMap[s.kind]
                const external = s.kind !== 'email'
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-accent/40"
                    >
                      <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                      <span className="flex-1">
                        <span className="block text-sm font-semibold">{s.label}</span>
                        <span className="block text-xs text-muted-foreground">
                          {s.handle}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </a>
                  </li>
                )
              })}
            </ul>
            <p className="mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              <span className="animate-rec inline-block h-1.5 w-1.5 rounded-full bg-status" />
              {profile.status}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
