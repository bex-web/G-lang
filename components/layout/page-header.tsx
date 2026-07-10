'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '@/content/site'
import { cn } from '@/lib/utils'

const nav = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/projects' },
  { label: 'Writing', href: '/publications' },
]

export function PageHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        scrolled
          ? 'border-b border-border bg-background/72 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 w-full items-center justify-between px-6 lg:px-12 xl:px-20">
        <Link href="/" className="group flex items-center gap-3" aria-label="Home">
          <span className="flex h-8 w-8 items-center justify-center rounded-[2px] border border-border-strong bg-card text-xs font-semibold text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
            {profile.initials}
          </span>
          <span className="hidden text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground transition-colors group-hover:text-foreground sm:inline">
            {profile.shortName}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors',
                  active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute inset-x-4 bottom-1 h-px origin-left bg-foreground transition-transform duration-300',
                    active ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </Link>
            )
          })}
        </nav>

        <Link
          href="/#connect"
          className="rounded-[2px] border border-border-strong px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-foreground"
        >
          Contact
        </Link>
      </div>
    </motion.header>
  )
}
