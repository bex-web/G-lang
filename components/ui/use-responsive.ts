'use client'

import { useState, useEffect } from 'react'

type ResponsiveProp<T> = {
  sm?: T
  md?: T
  lg?: T
  xl?: T
}

function getBreakpoint(): 'sm' | 'md' | 'lg' | 'xl' {
  if (typeof window === 'undefined') return 'md'
  const w = window.innerWidth
  if (w >= 1280) return 'xl'
  if (w >= 1024) return 'lg'
  if (w >= 768) return 'md'
  return 'sm'
}

function resolveValue<T>(prop: T | ResponsiveProp<T>, bp: 'sm' | 'md' | 'lg' | 'xl'): T {
  if (prop === null || prop === undefined) return prop as T
  if (typeof prop === 'object' && !Array.isArray(prop) && ('sm' in prop || 'md' in prop || 'lg' in prop || 'xl' in prop)) {
    const r = prop as ResponsiveProp<T>
    // cascade: pick the first defined value from bp down
    const order: ('xl' | 'lg' | 'md' | 'sm')[] = ['xl', 'lg', 'md', 'sm']
    const idx = order.indexOf(bp)
    for (let i = idx; i < order.length; i++) {
      const val = r[order[i]]
      if (val !== undefined) return val
    }
    // fallback: first defined
    return (r.xl ?? r.lg ?? r.md ?? r.sm) as T
  }
  return prop as T
}

export function useResponsive<T>(prop: T | ResponsiveProp<T>): T {
  const [bp, setBp] = useState<'sm' | 'md' | 'lg' | 'xl'>(() => getBreakpoint())

  useEffect(() => {
    const handler = () => setBp(getBreakpoint())
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return resolveValue(prop, bp)
}
