'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, FileText } from 'lucide-react'
import { RevealGroup, revealItem } from '@/components/common/reveal'
import { MotionItem } from '@/components/common/motion-item'
import { publications, type Publication } from '@/content/projects'
import { cn } from '@/lib/utils'

const types: (Publication['type'] | 'All')[] = ['All', 'Journal', 'Conference', 'Book', 'Patent', 'Thesis', 'Other']

export function PublicationArchive() {
  const [filter, setFilter] = useState<(typeof types)[number]>('All')
  const [open, setOpen] = useState<string | null>(publications[0]?.slug ?? null)

  const filtered = useMemo(
    () => (filter === 'All' ? publications : publications.filter((p) => p.type === filter)),
    [filter],
  )

  return (
    <>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter publications by type">
        {types.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={filter === t}
            onClick={() => setFilter(t)}
            className={cn(
              'rounded-[2px] border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors',
              filter === t
                ? 'border-foreground bg-foreground text-background'
                : 'border-border text-muted-foreground hover:text-foreground',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <RevealGroup
        key={filter}
        className="mt-12 divide-y divide-border border-y border-border"
      >
        {filtered.map((pub) => {
          const isOpen = open === pub.slug
          return (
            <MotionItem key={pub.slug} variants={revealItem} as="article">
              <h3>
                <button
                  onClick={() => setOpen(isOpen ? null : pub.slug)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-start gap-6 py-7 text-left transition-opacity duration-200 hover:opacity-80"
                >
                  {/* Thumbnail */}
                  {pub.thumbnail ? (
                    <div className="relative hidden h-16 w-16 shrink-0 overflow-hidden rounded-[2px] border border-border sm:block">
                      <Image
                        src={pub.thumbnail}
                        alt={pub.title}
                        fill
                        sizes="64px"
                        className="object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                      />
                    </div>
                  ) : (
                    <span className="hidden shrink-0 pt-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:block">
                      {pub.index}
                    </span>
                  )}
                  <span className="flex-1">
                    <span className="flex flex-wrap items-center gap-3">
                      <span className="rounded-[2px] border border-border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                        {pub.type}
                      </span>
                      <span className="text-xs font-medium tabular-nums text-muted-foreground">
                        {pub.year}
                      </span>
                    </span>
                    <span className="mt-3 block text-lg font-semibold leading-snug tracking-tight text-balance">
                      {pub.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {pub.authors} · {pub.venue}
                    </span>
                  </span>
                  <ArrowUpRight
                    className={cn(
                      'mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300',
                      isOpen && 'rotate-90 text-foreground',
                    )}
                  />
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 sm:pl-16">
                      <p className="max-w-3xl text-pretty leading-relaxed text-muted-foreground">
                        {pub.abstract}
                      </p>
                      <div className="mt-5 flex flex-wrap items-center gap-4">
                        {pub.link && (
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-[2px] border border-border-strong px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-foreground"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            {pub.serial}
                          </a>
                        )}
                        {!pub.link && pub.serial && (
                          <span className="inline-flex items-center gap-2 rounded-[2px] border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                            <FileText className="h-3.5 w-3.5" />
                            {pub.serial}
                          </span>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {pub.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-[2px] border border-border px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </MotionItem>
          )
        })}
      </RevealGroup>

      <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {filtered.length} of {publications.length} entries shown
      </p>
    </>
  )
}
