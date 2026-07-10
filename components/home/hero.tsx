'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'
import { heroContent } from '@/content/hero'
import { WelcomeScramble } from '@/components/home/welcome-scramble'

const SPRING = { stiffness: 120, damping: 18, mass: 0.6 }

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const bgScrollScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.3])

  // Pointer-driven 3D perspective
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), SPRING)
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), SPRING)
  // The background plane reacts more strongly, for embedded depth
  const rotXPlane = useSpring(useTransform(my, [-0.5, 0.5], [11, -11]), SPRING)
  const rotYPlane = useSpring(useTransform(mx, [-0.5, 0.5], [-13, 13]), SPRING)

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const { background } = heroContent

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="grain vignette relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
      aria-label="Introduction"
      style={{ perspective: 1300 }}
    >
      {/* 3D Background with perspective - Full width edge to edge */}
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, scale: bgScrollScale }}
        className="pointer-events-none fixed inset-0 z-0 origin-center [transform-style:preserve-3d] will-change-transform"
        aria-hidden="true"
      >
        <motion.div
          style={{ rotateX: rotXPlane, rotateY: rotYPlane, scale: 1.25 }}
          className="absolute inset-[-10%] [transform-style:preserve-3d] will-change-transform"
        >
          {background.type === 'gif' ? (
            <Image
              src={background.src}
              alt=""
              fill
              className="object-cover opacity-70 grayscale contrast-125"
              priority
              unoptimized
            />
          ) : background.type === 'video' ? (
            <video
              className="h-full w-full object-cover opacity-70 grayscale contrast-125"
              autoPlay
              muted={background.muted}
              loop={background.loop}
              playsInline
              poster={background.poster}
            >
              <source src={background.src} type="video/mp4" />
            </video>
          ) : (
            <motion.img
              src={background.src}
              alt=""
              className="h-full w-full object-cover opacity-70 grayscale contrast-125"
              animate={reduced ? undefined : { scale: [1.03, 1.09, 1.03] }}
              transition={{ duration: (background.duration || 7) * 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          {/* darkening + grid wash */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/5 to-background" />
          <div className="lab-grid absolute inset-0 opacity-60" />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-30 mx-auto flex w-full flex-col items-center px-6 lg:px-12 xl:px-20 text-center"
      >
        {/* Welcome greeting with scramble */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-6 text-sm font-medium tracking-[0.06em] text-muted-foreground sm:text-base"
        >
          <WelcomeScramble />
        </motion.div>

        {/* Logo - 3x larger */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="relative mb-8 h-96 w-[48rem] md:h-[30rem] md:w-[60rem]"
        >
          <Image
            src="/logo-wht.png"
            alt="G-Lang Logo"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          {heroContent.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-foreground"
          >
            View Work
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#connect"
            className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom readout */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-x-0 bottom-6 z-30 mx-auto flex w-full items-end justify-between px-6 lg:px-12 xl:px-20 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
      >
        <span>Scroll to explore</span>
        <span className="hidden md:inline">Selected work below</span>
      </motion.div>
    </section>
  )
}
