'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextRollProps {
  children: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  delay?: number
}

export function TextRoll({ 
  children, 
  className, 
  as: Component = 'span',
  delay = 0 
}: TextRollProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isMounted])

  const words = children.split(' ')

  // Determine initial state based on SSR or reduced motion
  const getInitialState = () => {
    if (!isMounted) {
      // SSR: render in final state to avoid mismatch
      return { y: 0, opacity: 1 }
    }
    if (reduced) {
      return { y: 0, opacity: 1 }
    }
    return { y: '100%', opacity: 0 }
  }

  const initialState = getInitialState()

  return (
    <Component
      ref={ref}
      className={cn('inline-block overflow-hidden', className)}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={initialState}
            animate={
              !isMounted || isVisible
                ? { y: 0, opacity: 1 }
                : initialState
            }
            transition={{
              duration: reduced || !isMounted ? 0 : 0.5,
              delay: isMounted && !reduced ? delay + wordIndex * 0.05 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Component>
  )
}
