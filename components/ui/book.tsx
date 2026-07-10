'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useResponsive } from '@/components/ui/use-responsive'

// ── Types ─────────────────────────────────────────────────────────────────────
type ResponsiveProp<T> = {
  sm?: T
  md?: T
  lg?: T
  xl?: T
}

export type BookItem = {
  slug: string
  index: string
  title: string
  authors: string
  venue: string
  year: string
  type: string
  serial: string
  link: string
  abstract: string
  tags: string[]
  thumbnail?: string
}

interface BookShelfProps {
  title: string
  variant?: 'simple' | 'stripe'
  width?: number | ResponsiveProp<number>
  color?: string
  textColor?: string
  illustration?: React.ReactNode
  textured?: boolean
  item?: BookItem
  onClick?: () => void
}

// ── Default illustration (same as reference) ──────────────────────────────────
const DefaultIllustration = (
  <svg fill="none" height="56" viewBox="0 0 36 56" width="36" xmlns="http://www.w3.org/2000/svg">
    <path clipRule="evenodd" d="M3.03113 28.0005C6.26017 23.1765 11.7592 20.0005 18 20.0005C24.2409 20.0005 29.7399 23.1765 32.9689 28.0005C29.7399 32.8244 24.2409 36.0005 18 36.0005C11.7592 36.0005 6.26017 32.8244 3.03113 28.0005Z" fill="#0070F3" fillRule="evenodd" />
    <path clipRule="evenodd" d="M32.9691 28.0012C34.8835 25.1411 36 21.7017 36 18.0015C36 8.06034 27.9411 0.00146484 18 0.00146484C8.05887 0.00146484 0 8.06034 0 18.0015C0 21.7017 1.11648 25.1411 3.03094 28.0012C6.25996 23.1771 11.7591 20.001 18 20.001C24.2409 20.001 29.74 23.1771 32.9691 28.0012Z" fill="#45DEC4" fillRule="evenodd" />
    <path clipRule="evenodd" d="M32.9692 28.0005C29.7402 32.8247 24.241 36.001 18 36.001C11.759 36.001 6.25977 32.8247 3.03077 28.0005C1.11642 30.8606 0 34.2999 0 38C0 47.9411 8.05887 56 18 56C27.9411 56 36 47.9411 36 38C36 34.2999 34.8836 30.8606 32.9692 28.0005Z" fill="#E5484D" fillRule="evenodd" />
  </svg>
)

// ── Book card (visual only, matches reference) ────────────────────────────────
export function Book({
  title,
  variant = 'stripe',
  width = 196,
  color,
  textColor = '#f1ede5',
  illustration,
  textured = false,
  item,
  onClick,
}: BookShelfProps) {
  const _width = useResponsive(width)

  // colors adapted to dark graphite theme
  const _color = color
    ? color
    : variant === 'simple'
    ? '#1f1f1f'
    : '#2d2d2d'

  // If thumbnail available, use it as illustration
  const coverIllustration = item?.thumbnail ? (
    <Image
      src={item.thumbnail}
      alt={item.title}
      fill
      className="object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-500"
      sizes={`${_width}px`}
    />
  ) : (illustration ?? DefaultIllustration)

  const _illustration = item?.thumbnail ? coverIllustration : (illustration ?? DefaultIllustration)

  return (
    <div
      className="inline-block w-fit cursor-pointer select-none"
      style={{ perspective: 900 }}
      onClick={onClick}
    >
      <div
        className={cn(
          'aspect-[49/60] w-fit relative rotate-0 duration-[250ms]',
          '[&:hover]:[transform:rotateY(-15deg)_translateY(-4px)]',
        )}
        style={{
          transformStyle: 'preserve-3d',
          minWidth: _width,
          containerType: 'inline-size',
          transition: 'transform 250ms ease',
        }}
      >
        {/* ── Front face ──────────────────────────────────────────────── */}
        <div
          className="flex flex-col h-full rounded-l-md rounded-r overflow-hidden relative"
          style={{
            width: _width,
            background: _color,
            boxShadow: '4px 6px 24px rgba(0,0,0,0.7), 2px 2px 8px rgba(0,0,0,0.4)',
          }}
        >
          {/* After border overlay */}
          <div className="absolute inset-0 rounded-l-md rounded-r border border-white/10 pointer-events-none z-20" />

          {/* Top stripe / cover area */}
          <div
            className={cn('w-full relative overflow-hidden', variant === 'stripe' && 'flex-1')}
            style={{ background: _color }}
          >
            {/* Cover image or illustration */}
            {variant === 'stripe' && (
              <div className="absolute h-full w-full">
                {_illustration}
              </div>
            )}
            {/* Spine binding left shadow */}
            <div
              className="absolute h-full w-[8.2%] mix-blend-overlay z-10"
              style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, transparent 100%)' }}
            />
          </div>

          {/* Bottom title area */}
          <div
            className={cn(
              'relative flex-1',
              variant === 'stripe' || (variant === 'simple' && !color)
                ? 'bg-gradient-to-b from-transparent to-black/60'
                : '',
            )}
            style={{ background: variant === 'simple' && color ? _color : undefined }}
          >
            {/* Spine binding shadow */}
            <div
              className="absolute h-full w-[8.2%] opacity-20"
              style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, transparent 100%)' }}
            />

            <div
              className={cn(
                'flex flex-col w-full p-[6.1%] pl-[14.3%]',
                variant === 'simple' ? 'gap-4' : 'justify-between',
              )}
              style={{
                containerType: 'inline-size',
                gap: `calc((24px / 196) * ${_width})`,
              }}
            >
              <span
                className={cn(
                  'leading-[1.25em] tracking-[-.02em] text-balance font-semibold',
                  variant === 'simple' ? 'text-[12cqw]' : 'text-[10.5cqw]',
                )}
                style={{ color: textColor }}
              >
                {title}
              </span>
              {variant === 'stripe' ? (
                <svg className="scale-75 -ml-1 -mb-1" height="24" width="24" style={{ fill: textColor }}>
                  <path d="M21,21H3L12,3Z" />
                </svg>
              ) : (illustration ?? DefaultIllustration)}
            </div>
          </div>

          {/* Texture overlay */}
          {textured && (
            <div className="absolute top-0 left-0 inset-0 rotate-180 rounded-l-md rounded-r mix-blend-hard-light pointer-events-none bg-cover bg-no-repeat opacity-50 brightness-110 bg-[url('https://assets.vercel.com/image/upload/v1720554484/front/design/book-texture.avif')]" />
          )}
        </div>

        {/* ── Spine (visible on hover / 3D rotate) ──────────────────── */}
        <div
          className="h-[calc(100%_-_2_*_3px)] w-[calc(29cqw_-_2px)] absolute top-[3px]"
          style={{
            background: 'linear-gradient(90deg, #3a3a3a, transparent 70%), linear-gradient(#2a2a2a, #1a1a1a)',
            transform: `translateX(calc(${_width} * 1px - 29cqw / 2 - 3px)) rotateY(90deg) translateX(calc(29cqw / 2))`,
          }}
        />

        {/* ── Back face ──────────────────────────────────────────────── */}
        <div
          className="bg-[#111] absolute left-0 top-0 rounded-l-md rounded-r h-full"
          style={{ width: _width, transform: 'translateZ(calc(-1 * 29cqw))' }}
        />
      </div>
    </div>
  )
}

// ── BookGrid: 4×1 horizontal grid with hover-based display ───────────────────
interface BookGridProps {
  items: BookItem[]
  className?: string
}

export function BookShelf({ items, className }: BookGridProps) {
  const [openItem, setOpenItem] = useState<BookItem | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <>
      {/* Grid: 4x1 layout with 1.5x larger size */}
      <div className={cn('grid grid-cols-2 gap-6 sm:grid-cols-4 md:gap-8', className)}>
        {items.slice(0, 4).map((item, index) => (
          <motion.div
            key={item.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.07 }}
            className="flex flex-col items-center gap-3 relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Book with overlay on hover */}
            <div className="relative" onClick={() => setOpenItem(item)}>
              <Book
                title={item.title}
                variant="stripe"
                width={195}
                item={item}
                textured
                onClick={() => setOpenItem(item)}
              />
              
              {/* Overlay that appears on hover */}
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent rounded-l-md rounded-r pointer-events-none"
                  style={{ zIndex: 10 }}
                >
                  <h3 className="text-sm font-bold text-white leading-tight tracking-tight line-clamp-3">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-white/70">
                    {item.type} · {item.year}
                  </p>
                </motion.div>
              )}
            </div>
            
            {/* Type badge below book */}
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              {item.type} · {item.year}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {openItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setOpenItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-lg border border-border bg-card shadow-2xl"
            >
              {/* Cover banner */}
              {openItem.thumbnail && (
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={openItem.thumbnail}
                    alt={openItem.title}
                    fill
                    className="object-cover grayscale brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />
                </div>
              )}

              <div className="p-6">
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-[2px] border border-signal/30 bg-signal/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-signal">
                    {openItem.type}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{openItem.year}</span>
                  <span className="font-mono text-xs text-muted-foreground">{openItem.serial}</span>
                </div>

                <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight">{openItem.title}</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="text-foreground/80">{openItem.authors}</span>
                  {' · '}
                  <span className="italic">{openItem.venue}</span>
                </p>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{openItem.abstract}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {openItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-[2px] border border-border px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {openItem.link && (
                    <a
                      href={openItem.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-[2px] border border-border-strong bg-foreground px-4 py-2 text-xs font-semibold text-background transition-colors hover:bg-foreground/90"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View Publication
                    </a>
                  )}
                  <button
                    onClick={() => setOpenItem(null)}
                    className="inline-flex items-center gap-2 rounded-[2px] border border-border px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                  >
                    Close
                  </button>
                </div>
              </div>

              <button
                onClick={() => setOpenItem(null)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/70 transition-colors hover:bg-black/80 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
