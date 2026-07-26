'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TetrisLoadingBar } from '@/components/ui/tetris-loader'
import { useAssetsLoaded } from '@/hooks/use-assets-loaded'

interface PageLoadWrapperProps {
  children: React.ReactNode
}

export function PageLoadWrapper({ children }: PageLoadWrapperProps) {
  const [mounted, setMounted] = useState(false)
  const assetsLoaded = useAssetsLoaded()
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (assetsLoaded && mounted) {
      const timer = setTimeout(() => setRevealed(true), 400)
      return () => clearTimeout(timer)
    }
  }, [assetsLoaded, mounted])

  const showLoader = mounted && !revealed

  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <TetrisLoadingBar size="sm" speed="relaxed" className="scale-75" />

            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
              Loading screen, enjoy your moment ^^
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ visibility: showLoader ? 'hidden' : 'visible' }}>
        {children}
      </div>
    </>
  )
}
