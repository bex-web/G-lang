'use client'

import { useEffect, useRef } from 'react'

type PointerState = { x: number; y: number; active: boolean }

/**
 * Singleton pointer tracker. A single window listener feeds every subscriber,
 * so many cursor-reactive components (pierce headings, custom cursor) share one
 * cheap source of truth instead of each attaching their own move handler.
 */
const state: PointerState = { x: -9999, y: -9999, active: false }
const subscribers = new Set<(s: PointerState) => void>()
let listening = false

function emit() {
  subscribers.forEach((fn) => fn(state))
}

function onMove(e: PointerEvent) {
  state.x = e.clientX
  state.y = e.clientY
  state.active = true
  emit()
}

function onLeave() {
  state.active = false
  emit()
}

function ensureListening() {
  if (listening || typeof window === 'undefined') return
  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerleave', onLeave)
  listening = true
}

/** Subscribe to shared pointer updates. Callback receives live pointer state. */
export function usePointer(callback: (s: PointerState) => void) {
  const ref = useRef(callback)
  ref.current = callback
  useEffect(() => {
    ensureListening()
    const fn = (s: PointerState) => ref.current(s)
    subscribers.add(fn)
    return () => {
      subscribers.delete(fn)
    }
  }, [])
}

export function getPointer(): PointerState {
  return state
}
