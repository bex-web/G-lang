'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const nav = [
  { label: 'HOME', href: '/', id: 'home' },
  { label: 'PROJECTS', href: '/projects', id: 'projects' },
  { label: 'PUBLICATIONS', href: '/publications', id: 'publications' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        scrolled
          ? 'border-b border-border bg-background/72 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 w-full items-center justify-between px-6 lg:px-12 xl:px-20">
        <a href="#top" className="group flex items-center gap-3" aria-label="Home">
          <div className="relative h-8 w-20 transition-opacity group-hover:opacity-80">
            <Image
              src="/logo-wht.png"
              alt="G-Lang"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>
          <span className="hidden text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground transition-colors group-hover:text-foreground sm:inline">
            G-Lang Portfolio
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const isActive =
              item.id === 'home'
                ? pathname === '/'
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors',
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute inset-x-4 bottom-1 h-px origin-left bg-foreground transition-transform duration-300',
                    isActive ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </Link>
            )
          })}
        </nav>

        <a
          href="#connect"
          className={cn(
            'rounded-[2px] border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors',
            active === 'connect'
              ? 'border-foreground bg-foreground text-background'
              : 'border-border-strong text-foreground hover:border-foreground',
          )}
        >
          Contact
        </a>
      </div>
    </motion.header>
  )
}
