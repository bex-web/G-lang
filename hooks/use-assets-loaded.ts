'use client'

import { useState, useEffect, useRef } from 'react'

const SELECTOR = 'img, video'

function isLoaded(el: HTMLImageElement | HTMLVideoElement): boolean {
  if (el instanceof HTMLImageElement) {
    return el.complete && el.naturalWidth > 0
  }
  if (el instanceof HTMLVideoElement) {
    return el.readyState >= 3
  }
  return false
}

export function useAssetsLoaded() {
  const [loaded, setLoaded] = useState(false)
  const tracked = useRef<Set<Element>>(new Set())
  const pendingCount = useRef(0)

  useEffect(() => {
    tracked.current.clear()
    pendingCount.current = 0
    setLoaded(false)

    const check = () => {
      if (pendingCount.current === 0) {
        setLoaded(true)
      }
    }

    const observe = (el: Element) => {
      if (tracked.current.has(el)) return
      tracked.current.add(el)

      if (
        el instanceof HTMLImageElement ||
        el instanceof HTMLVideoElement
      ) {
        if (isLoaded(el)) return

        pendingCount.current++

        const onload = () => {
          pendingCount.current--
          el.removeEventListener('load', onload)
          el.removeEventListener('loadeddata', onload)
          check()
        }

        el.addEventListener('load', onload)
        el.addEventListener('loadeddata', onload)

        if (el instanceof HTMLVideoElement) {
          el.addEventListener('canplaythrough', onload, { once: true })
        }

        if (isLoaded(el)) {
          pendingCount.current--
          el.removeEventListener('load', onload)
          el.removeEventListener('loadeddata', onload)
          check()
        }
      }
    }

    const scan = () => {
      const els = document.querySelectorAll<Element>(SELECTOR)
      els.forEach(observe)
      check()
    }

    scan()

    const observer = new MutationObserver((mutations) => {
      let added = false
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node instanceof Element) {
            if (node.matches(SELECTOR)) {
              observe(node)
              added = true
            }
            node.querySelectorAll(SELECTOR).forEach(observe)
            added = true
          }
        }
      }
      if (added) check()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
      tracked.current.clear()
    }
  }, [])

  return loaded
}
