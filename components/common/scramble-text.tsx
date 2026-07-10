'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________'

export function ScrambleText({
  text,
  className,
  trigger = 'view',
  duration = 900,
}: {
  text: string
  className?: string
  trigger?: 'view' | 'hover'
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [output, setOutput] = useState(text)
  const rafRef = useRef<number>(0)

  const run = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setOutput(text)
      return
    }
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const revealCount = Math.floor(t * text.length)
      let next = ''
      for (let i = 0; i < text.length; i++) {
        if (i < revealCount || text[i] === ' ') next += text[i]
        else next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }
      setOutput(next)
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
      else setOutput(text)
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    if (trigger === 'view' && inView) run()
    return () => cancelAnimationFrame(rafRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, trigger])

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={trigger === 'hover' ? run : undefined}
      aria-label={text}
    >
      <span aria-hidden="true">{output}</span>
    </span>
  )
}
