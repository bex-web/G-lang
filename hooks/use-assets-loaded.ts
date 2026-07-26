'use client'

import { useState, useEffect, useRef } from 'react'

const POLL_MS = 400
const TIMEOUT_MS = 30000

function allAssetsReady(): boolean {
  const images = document.querySelectorAll<HTMLImageElement>('img')
  const videos = document.querySelectorAll<HTMLVideoElement>('video')

  for (const img of images) {
    if (img.dataset.skipLoader !== undefined) continue
    if (!img.complete) return false
  }

  for (const video of videos) {
    if (video.dataset.skipLoader !== undefined) continue
    if (video.readyState < 2) return false
  }

  return true
}

export function useAssetsLoaded() {
  const [loaded, setLoaded] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    let timer: ReturnType<typeof setTimeout>
    let timeoutTimer: ReturnType<typeof setTimeout>

    const poll = () => {
      if (allAssetsReady()) {
        setLoaded(true)
      } else {
        timer = setTimeout(poll, POLL_MS)
      }
    }

    timer = setTimeout(poll, POLL_MS)

    timeoutTimer = setTimeout(() => {
      clearTimeout(timer)
      setLoaded(true)
    }, TIMEOUT_MS)

    return () => {
      clearTimeout(timer)
      clearTimeout(timeoutTimer)
    }
  }, [])

  return loaded
}
