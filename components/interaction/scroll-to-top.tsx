'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

/**
 * Fixed bottom-right FAB that appears once the user has scrolled past 50% of
 * the page height. Scrolls smoothly back to the top on click.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setVisible(docH > 0 && scrolled / docH >= 0.5)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          onClick={handleClick}
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Scroll to top"
          data-cursor="hover"
          className="group fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-[2px] border border-border-strong bg-card text-muted-foreground shadow-lg transition-colors duration-200 hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
