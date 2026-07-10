'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SiteLoader } from '@/components/ui/tetris-loader'

interface PageLoadWrapperProps {
  children: React.ReactNode
}

export function PageLoadWrapper({ children }: PageLoadWrapperProps) {
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check session flag - only show loader once per session
    const shown = sessionStorage.getItem('loader-shown')
    if (shown) {
      setLoading(false)
    }
  }, [])

  const handleDone = () => {
    sessionStorage.setItem('loader-shown', '1')
    setLoading(false)
  }

  // Avoid hydration mismatch: render children immediately until mounted
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <>
      <AnimatePresence>
        {loading && <SiteLoader onDone={handleDone} />}
      </AnimatePresence>
      {/* Hide content visually while loading to prevent flash */}
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        {children}
      </div>
    </>
  )
}
