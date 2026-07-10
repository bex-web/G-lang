'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export type ExpandCard = {
  slug: string
  title: string
  tags: string[]
  thumbnail: string
  overview?: string[]
}

interface ExpandOnHoverProps {
  cards: ExpandCard[]
  className?: string
}

export default function ExpandOnHover({ cards, className }: ExpandOnHoverProps) {
  // Default to middle card expanded
  const [expandedIndex, setExpandedIndex] = useState<number>(Math.floor(cards.length / 2))

  return (
    <div className={cn('w-full flex justify-center', className)}>
      {/* Desktop: horizontal strip with fixed width to prevent shifting */}
      <div 
        className="hidden lg:flex items-stretch gap-1" 
        style={{ 
          height: '24rem',
          width: 'calc(24rem + 5rem * 8 + 0.25rem * 8)' // 1 expanded + 8 collapsed + gaps
        }}
      >
        {cards.map((card, idx) => (
          <motion.div
            key={card.slug}
            className="relative cursor-pointer overflow-hidden rounded-md"
            animate={{
              width: idx === expandedIndex ? '24rem' : '5rem',
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            }}
            style={{ 
              flexShrink: 0,
              willChange: 'width',
            }}
            onMouseEnter={() => setExpandedIndex(idx)}
          >
            {/* Image */}
            <Image
              src={card.thumbnail}
              alt={card.title}
              fill
              className="object-cover grayscale transition-all duration-500"
              style={{ 
                filter: idx === expandedIndex 
                  ? 'grayscale(0%) brightness(1)' 
                  : 'grayscale(100%) brightness(0.6)'
              }}
              sizes="(max-width: 1024px) 100vw, 24rem"
            />

            {/* Gradient overlay - darker on idle */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500"
              style={{ opacity: idx === expandedIndex ? 1 : 1.2 }}
            />

            {/* Collapsed: vertical title */}
            {idx !== expandedIndex && (
              <div className="absolute inset-0 flex items-end justify-center pb-4">
                <p
                  className="text-white/60 text-xs font-semibold tracking-[0.15em] uppercase whitespace-nowrap"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                >
                  {card.title.length > 20 ? card.title.slice(0, 20) + '…' : card.title}
                </p>
              </div>
            )}

            {/* Expanded: full content */}
            <AnimatePresence>
              {idx === expandedIndex && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="absolute inset-0 flex flex-col justify-end p-6 text-white"
                >
                  <h3 className="text-xl font-bold tracking-tight leading-tight">
                    {card.title}
                  </h3>

                  {card.overview?.[0] && (
                    <p className="mt-2 text-sm text-white/80 leading-relaxed line-clamp-3">
                      {card.overview[0]}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {card.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-[2px] border border-white/30 bg-white/10 px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/projects/${card.slug}`}
                    className="mt-4 inline-flex w-fit items-center gap-2 rounded-[2px] border border-white/40 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/60"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Project
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Mobile: 2-col grid fallback */}
      <div className="grid grid-cols-2 gap-3 lg:hidden">
        {cards.map((card, idx) => (
          <Link
            key={card.slug}
            href={`/projects/${card.slug}`}
            className="group relative aspect-square overflow-hidden rounded-md"
          >
            <Image
              src={card.thumbnail}
              alt={card.title}
              fill
              className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
              style={{ filter: 'grayscale(100%) brightness(0.6)' }}
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-3">
              <h3 className="text-sm font-bold text-white leading-tight line-clamp-2">{card.title}</h3>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {card.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[2px] bg-white/15 px-1.5 py-0.5 text-[9px] font-medium text-white/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
