'use client'

import { useEffect, useRef, useState } from 'react'
import { usePointer } from '@/hooks/use-pointer'

/**
 * Minimal monochrome cursor: a precise ring that lerps toward the pointer and
 * expands over interactive targets. Only mounts on fine pointers (mouse/trackpad)
 * and bows out entirely under reduced-motion, leaving the native cursor intact.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: -100, y: -100 })
  const pos = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number | null>(null)
  const smoothing = useRef(0.18)
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [down, setDown] = useState(false)

  useEffect(() => {
    // A pointer ring isn't a vestibular-motion trigger, so it runs on any device
    // that isn't touch-only. Under reduced-motion we snap to the pointer (no easing).
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    const touchOnly = coarse && !fine
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    smoothing.current = reduced ? 1 : 0.18
    if (!touchOnly) {
      setEnabled(true)
      document.documentElement.classList.add('has-custom-cursor')
    }
    return () => document.documentElement.classList.remove('has-custom-cursor')
  }, [])

  usePointer((s) => {
    target.current = { x: s.x, y: s.y }
  })

  useEffect(() => {
    if (!enabled) return

    const loop = () => {
      const k = smoothing.current
      pos.current.x += (target.current.x - pos.current.x) * k
      pos.current.y += (target.current.y - pos.current.y) * k
      const el = dotRef.current
      if (el) {
        el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element &&
      Boolean(t.closest('a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'))

    const onOver = (e: PointerEvent) => setHovering(isInteractive(e.target))
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)

    window.addEventListener('pointerover', onOver)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center"
    >
      <span
        className="block rounded-full border border-foreground/80 transition-[width,height,background-color,opacity] duration-200 ease-out"
        style={{
          width: hovering ? 44 : down ? 14 : 22,
          height: hovering ? 44 : down ? 14 : 22,
          backgroundColor: hovering ? 'rgba(241,237,229,0.10)' : 'transparent',
          opacity: 0.9,
        }}
      />
      <span className="absolute h-1 w-1 rounded-full bg-foreground" />
    </div>
  )
}
