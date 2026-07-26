'use client'

import { useState, useEffect, useRef } from 'react'

function allAssetsReady(): boolean {
  const images = document.querySelectorAll<HTMLImageElement>('img')
  const videos = document.querySelectorAll<HTMLVideoElement>('video')

  for (const img of images) {
    if (img.dataset.skipLoader !== undefined) continue
    if (!img.complete) return false
    if (img.naturalWidth === 0) continue
  }

  for (const video of videos) {
    if (video.dataset.skipLoader !== undefined) continue
    if (video.readyState < 4) return false
  }

  return true
}

export function useAssetsLoaded() {
  const [loaded, setLoaded] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    let raf: number

    const poll = () => {
      if (allAssetsReady()) {
        setLoaded(true)
      } else {
        raf = requestAnimationFrame(poll)
      }
    }

    raf = requestAnimationFrame(poll)

    return () => cancelAnimationFrame(raf)
  }, [])

  return loaded
}
