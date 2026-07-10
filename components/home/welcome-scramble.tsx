'use client'

import { useEffect, useRef, useState } from 'react'
import { welcomeVariants } from '@/content/hero'
import { cn } from '@/lib/utils'

/**
 * Per-language scramble glyph pools — using actual characters from each script
 * so the noise looks like the destination text while scrambling.
 */
const GLYPH_POOLS: Record<string, string> = {
  Latin:       'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  Japanese:    'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワ',
  Hangul:      '가나다라마바사아자차카타파하',
  Arabic:      'ابتثجحخدذرزسشصضطظعغفقكلمنهوي',
  Cyrillic:    'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзиклмнопрстуфхцчшщъыьэюя',
  Han:         '你好来到欢迎世界语言文字',
  Greek:       'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω',
  Devanagari:  'अआइईउऊएऐओऔकखगघचछजझटठडढणतथदधनपफबभमयरलवशषसह',
  Thai:        'กขคงจฉชซญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหอฮ',
  Default:     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
}

function randFrom(pool: string) {
  return pool[Math.floor(Math.random() * pool.length)]
}

/** rAF ~60fps, 24 frames ≈ 400 ms scramble — snappy but readable. */
const SCRAMBLE_FRAMES = 24

export function WelcomeScramble({ className }: { className?: string }) {
  const [index, setIndex] = useState(0)
  const [chars, setChars] = useState<string[]>(() => Array.from(welcomeVariants[0].text))
  const rafRef = useRef<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const indexRef = useRef(0) // tracks current index without stale-closure issues

  useEffect(() => {
    // Check reduced motion preference at runtime to avoid SSR mismatch
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let cancelled = false

    const scrambleTo = (nextText: string, nextScript: string, onDone: () => void) => {
      const pool = GLYPH_POOLS[nextScript] ?? GLYPH_POOLS.Default
      const next = Array.from(nextText)
      let frame = 0

      const step = () => {
        if (cancelled) return
        frame++
        const progress = frame / SCRAMBLE_FRAMES // 0 → 1

        setChars(
          next.map((targetCh, i) => {
            // Each character has a staggered reveal point spread across [0.05, 0.85]
            const revealAt = 0.05 + (i / Math.max(next.length - 1, 1)) * 0.80
            if (progress >= revealAt) return targetCh
            if (targetCh === ' ' || targetCh === '\u00A0') return ' '
            // During scramble: random glyph from the destination language pool
            return randFrom(pool)
          }),
        )

        if (frame < SCRAMBLE_FRAMES) {
          rafRef.current = requestAnimationFrame(step)
        } else {
          // Ensure final state is exactly the target
          setChars(next)
          onDone()
        }
      }

      rafRef.current = requestAnimationFrame(step)
    }

    const advance = () => {
      if (cancelled) return
      const next = (indexRef.current + 1) % welcomeVariants.length
      const variant = welcomeVariants[next]
      scrambleTo(variant.text, variant.script, () => {
        indexRef.current = next
        setIndex(next)
        timerRef.current = setTimeout(advance, variant.hold)
      })
    }

    // Hold the first variant for its full duration before starting the cycle
    timerRef.current = setTimeout(advance, welcomeVariants[0].hold)

    return () => {
      cancelled = true
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      if (timerRef.current != null) clearTimeout(timerRef.current)
    }
  // Run once on mount only — indexRef handles index tracking without stale closures
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const variant = welcomeVariants[index]

  return (
    <span
      className={cn('inline-block', className)}
      dir={variant.dir}
      aria-live="polite"
      aria-atomic="true"
      aria-label={welcomeVariants[0].text}
      lang={variant.lang}
    >
      {chars.map((ch, i) =>
        ch === ' ' ? (
          // Render spaces as actual whitespace outside the inline-block span
          // so word-spacing and line-breaking work correctly across all scripts
          <span key={i} aria-hidden="true">{' '}</span>
        ) : (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block transition-opacity duration-75"
          >
            {ch}
          </span>
        ),
      )}
    </span>
  )
}
