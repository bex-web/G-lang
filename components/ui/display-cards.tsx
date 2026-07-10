'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export type DisplayCardItem = {
  slug: string
  icon?: React.ReactNode
  title: string
  authors: string
  venue: string
  year: string
  type: string
  abstract: string
  tags: string[]
  thumbnail?: string
  link?: string
  serial?: string
}

interface DisplayCardsProps {
  cards: DisplayCardItem[]
  className?: string
}

export default function DisplayCards({ cards, className }: DisplayCardsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleCardClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={cn('relative mx-auto w-full max-w-4xl', className)}>
      <div className="relative grid" style={{ gridTemplateAreas: '"stack"' }}>
        {cards.map((card, index) => {
          const isOpen = openIndex === index
          const baseDelay = index * 0.05

          // Right-up stacking: each card offset to the right and up
          const translateX = index * 60 // Move right
          const translateY = -index * 60 // Move up

          return (
            <motion.div
              key={card.slug}
              style={{ gridArea: 'stack' }}
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: 1,
                y: 0,
                x: isOpen ? 0 : translateX,
                translateY: isOpen ? 0 : translateY,
                scale: isOpen ? 1 : 1,
                zIndex: isOpen ? 50 : cards.length - index,
              }}
              transition={{
                duration: 0.5,
                delay: baseDelay,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => handleCardClick(index)}
              className={cn(
                'relative cursor-pointer rounded-xl border border-border bg-card p-6 transition-all duration-700',
                'before:absolute before:inset-0 before:rounded-xl before:bg-background/50 before:bg-blend-overlay before:transition-opacity before:duration-700',
                isOpen
                  ? 'grayscale-0 before:opacity-0 hover:-translate-y-2'
                  : 'grayscale-[100%] hover:-translate-y-10 hover:before:opacity-0 hover:grayscale-0',
              )}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    {card.icon && (
                      <span className="text-signal">{card.icon}</span>
                    )}
                    <span className="rounded-[2px] border border-border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                      {card.type}
                    </span>
                    <span className="text-xs font-medium tabular-nums text-muted-foreground">
                      {card.year}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {card.authors} · {card.venue}
                  </p>
                </div>
              </div>

              {/* Expandable content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 overflow-hidden"
                  >
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {card.abstract}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-[2px] border border-border px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {card.link && (
                      <a
                        href={card.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-4 inline-flex items-center gap-2 rounded-[2px] border border-border-strong px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-foreground"
                      >
                        Read paper
                      </a>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
