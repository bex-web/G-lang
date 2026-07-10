'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'

export type ProjectCard = {
  code: string
  title: string
  org: string
  year: string
  description: string
  link: string
}

interface StackingCardProps {
  projects: ProjectCard[]
}

function Card({
  project,
  index,
  progress,
  range,
  targetScale,
}: {
  project: ProjectCard
  index: number
  progress: any
  range: [number, number]
  targetScale: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div
      ref={cardRef}
      className="sticky top-24 flex h-[500px] items-center justify-center md:h-[600px]"
      style={{ top: `calc(24px + ${index * 40}px)` }}
    >
      <motion.div
        style={{ scale }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex h-full w-full flex-col overflow-hidden rounded-[24px] border border-border transition-all duration-500"
      >
        {/* Full background image */}
        <div className="absolute inset-0">
          <Image
            src={project.link}
            alt={project.title}
            fill
            className={`object-cover transition-all duration-500 ${
              isHovered ? 'grayscale-0' : 'grayscale'
            }`}
            sizes="(max-width: 768px) 100vw, 80vw"
          />
          {/* Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        {/* Typography overlay */}
        <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white md:p-12">
          {/* Top row: org and year */}
          <div className="flex items-start justify-between">
            <span className="text-sm font-medium uppercase tracking-wider opacity-90">
              {project.org}
            </span>
            <span className="font-mono text-2xl font-light tabular-nums opacity-90">
              {project.year}
            </span>
          </div>

          {/* Bottom: code, title, and description */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
              {project.code} · {project.title}
            </h3>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed opacity-90 md:text-base">
              {project.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function StackingCard({ projects }: StackingCardProps) {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  return (
    <div ref={container} className="relative">
      {projects.map((project, index) => {
        const targetScale = 1 - (projects.length - index) * 0.05
        const range: [number, number] = [index / projects.length, 1]

        return (
          <Card
            key={index}
            project={project}
            index={index}
            progress={scrollYProgress}
            range={range}
            targetScale={targetScale}
          />
        )
      })}
      <div className="h-screen" />
    </div>
  )
}
