'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ProjectGalleryProps {
  images: string[]
  title: string
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const prev = () =>
    setLightbox((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  const next = () =>
    setLightbox((i) => (i === null ? null : (i + 1) % images.length))

  return (
    <>
      {/* Thumbnail strip */}
      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((src, idx) => (
          <button
            key={src}
            onClick={() => setLightbox(idx)}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-[3px] border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            aria-label={`View image ${idx + 1} of ${images.length}`}
          >
            <Image
              src={src}
              alt={`${title} — image ${idx + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-background/10 transition-opacity duration-300 group-hover:opacity-0" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            {/* Counter */}
            <span className="absolute left-1/2 top-6 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {lightbox + 1} / {images.length}
            </span>

            {/* Close */}
            <button
              className="absolute right-6 top-6 rounded-[2px] border border-border p-2 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Prev */}
            {images.length > 1 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-[2px] border border-border p-2 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground sm:left-8"
                onClick={(e) => { e.stopPropagation(); prev() }}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-16 h-[80vh] w-full max-w-5xl overflow-hidden rounded-[3px] border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightbox]}
                alt={`${title} — image ${lightbox + 1}`}
                fill
                sizes="(max-width: 1200px) 90vw, 1200px"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Next */}
            {images.length > 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-[2px] border border-border p-2 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground sm:right-8"
                onClick={(e) => { e.stopPropagation(); next() }}
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
