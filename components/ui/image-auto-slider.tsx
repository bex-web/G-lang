'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const sliderImages = [
  { src: '/images/slider/1.png', alt: 'Slider 1' },
  { src: '/images/slider/2.jfif', alt: 'Slider 2' },
  { src: '/images/slider/3.jfif', alt: 'Slider 3' },
  { src: '/images/slider/4.png', alt: 'Slider 4' },
  { src: '/images/slider/5.jpg', alt: 'Slider 5' },
  { src: '/images/slider/6.png', alt: 'Slider 6' },
]

interface ImageAutoSliderProps {
  className?: string
}

export default function ImageAutoSlider({ className }: ImageAutoSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5 // pixels per frame

    const animate = () => {
      if (!scrollContainer) return

      scrollPosition += scrollSpeed
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth

      if (scrollPosition >= maxScroll) {
        scrollPosition = 0
      }

      scrollContainer.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  // Double the images for seamless loop
  const doubledImages = [...sliderImages, ...sliderImages]

  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      {/* Centered Logo Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <div className="relative h-48 w-48 sm:h-60 sm:w-60 md:h-72 md:w-72">
          <div className="absolute inset-0 rounded-3xl bg-background/95 backdrop-blur-md shadow-2xl" />
          <div className="relative h-full w-full p-6 sm:p-8">
            <Image
              src="/logo-wht.png"
              alt="G-Lang Logo"
              fill
              className="object-contain p-2"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-hidden"
        style={{ scrollBehavior: 'auto' }}
      >
        {doubledImages.map((image, index) => (
          <motion.div
            key={`${image.src}-${index}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: (index % sliderImages.length) * 0.1 }}
            className="flex-shrink-0 w-[240px] sm:w-[280px] md:w-[320px]"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
              <div
                className="relative"
                style={{ aspectRatio: '4/5' }} // 4:5 ratio
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover grayscale transition-all duration-500 hover:grayscale-0 hover:scale-105"
                  sizes="320px"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
