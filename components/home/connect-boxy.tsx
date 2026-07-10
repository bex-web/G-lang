'use client'

import Image from 'next/image'
import { Mail, MessageCircle, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/common/reveal'
import { MagneticText } from '@/components/ui/magnetic-text'
import BoxyAppIcons3D, { IconWrapper, type IconGridItem } from '@/components/ui/boxy-app-icons-3d'
import { profile, contact } from '@/content/site'

const socialIcons: IconGridItem[] = [
  {
    id: 'email',
    icon: <IconWrapper><Image src="/icon/icon_email.svg" alt="Email" width={20} height={20} /></IconWrapper>,
    name: 'Email',
    href: contact.emailHref,
  },
  {
    id: 'whatsapp',
    icon: <IconWrapper><Image src="/icon/icon_whatsapp.svg" alt="WhatsApp" width={20} height={20} /></IconWrapper>,
    name: 'WhatsApp',
    href: contact.whatsappHref,
  },
  {
    id: 'linkedin',
    icon: <IconWrapper><Image src="/icon/icon_linkedin.svg" alt="LinkedIn" width={20} height={20} /></IconWrapper>,
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/gilang-pratama-putra-siswanto',
  },
  {
    id: 'github',
    icon: <IconWrapper><Image src="/icon/icon_github.svg" alt="GitHub" width={20} height={20} /></IconWrapper>,
    name: 'GitHub',
    href: 'https://github.com/gilangpps',
  },
  {
    id: 'instagram',
    icon: <IconWrapper><Image src="/icon/icon_instagram.svg" alt="Instagram" width={20} height={20} /></IconWrapper>,
    name: 'Instagram',
    href: 'https://instagram.com/gilang_pratamaps',
  },
]

export function ConnectBoxy() {
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
              <MagneticText
                text="Let's build something precise."
                hoverText="COLLABORATE"
                className="text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl"
              />
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
                <span className="hidden sm:inline">{contact.email}</span>
                <span className="sm:hidden">Email</span>
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

          <Reveal className="md:col-span-5 flex flex-col items-center justify-center gap-8" delay={0.15}>
            <div className="scale-[1.2] sm:scale-[1.5] md:scale-[2] transform transition-all duration-300 hover:scale-[1.25] sm:hover:scale-[1.55] md:hover:scale-[2.05]">
              <BoxyAppIcons3D items={socialIcons} />
            </div>
            <p className="mt-6 md:mt-12 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              <span className="animate-rec inline-block h-1.5 w-1.5 rounded-full bg-status" />
              {profile.status}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
