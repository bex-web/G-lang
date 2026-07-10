'use client'

import { useEffect, useRef } from 'react'
import { usePointer } from '@/hooks/use-pointer'
import { cn } from '@/lib/utils'

type PierceTextProps = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p'
  className?: string
}

/**
 * Renders heading text as per-character spans and inverts the single glyph
 * directly under the pointer — a precise "cut-through" effect. Hit-testing is
 * gated behind requestAnimationFrame and a bounding-box early-out, and it
 * mutates classNames imperatively so it never triggers React re-renders.
 */
export function PierceText({ text, as: Tag = 'span', className }: PierceTextProps) {
  const containerRef = useRef<HTMLElement>(null)
  const charRefs = useRef<HTMLSpanElement[]>([])
  const rectCache = useRef<DOMRect[] | null>(null)
  const rafRef = useRef<number | null>(null)
  const pending = useRef<{ x: number; y: number; active: boolean } | null>(null)

  charRefs.current = []

  useEffect(() => {
    const invalidate = () => {
      rectCache.current = null
    }
    window.addEventListener('resize', invalidate)
    window.addEventListener('scroll', invalidate, { passive: true })
    return () => {
      window.removeEventListener('resize', invalidate)
      window.removeEventListener('scroll', invalidate)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const process = () => {
    rafRef.current = null
    const s = pending.current
    const container = containerRef.current
    if (!s || !container) return

    const cRect = container.getBoundingClientRect()
    const pad = 28
    const inside =
      s.active &&
      s.x >= cRect.left - pad &&
      s.x <= cRect.right + pad &&
      s.y >= cRect.top - pad &&
      s.y <= cRect.bottom + pad

    if (!inside) {
      charRefs.current.forEach((el) => el.classList.remove('pierce-on'))
      return
    }

    if (!rectCache.current) {
      rectCache.current = charRefs.current.map((el) => el.getBoundingClientRect())
    }
    const rects = rectCache.current

    let hit = -1
    for (let i = 0; i < rects.length; i++) {
      const r = rects[i]
      if (s.x >= r.left && s.x <= r.right && s.y >= r.top && s.y <= r.bottom) {
        hit = i
        break
      }
    }
    charRefs.current.forEach((el, i) => {
      el.classList.toggle('pierce-on', i === hit)
    })
  }

  usePointer((s) => {
    pending.current = { x: s.x, y: s.y, active: s.active }
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(process)
  })

  return (
    <Tag ref={containerRef as never} className={cn('pierce', className)} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          ref={(el) => {
            if (el) charRefs.current[i] = el
          }}
          className="pierce-char"
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </Tag>
  )
}
