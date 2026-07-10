'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { SectionHeading } from '@/components/common/section-heading'
import { specNodes, groupLabels, type SpecNode } from '@/content/specialities'

// Map SpecNode group to energy / status
const groupEnergy: Record<SpecNode['group'], number> = {
  core: 95,
  hardware: 96,
  software: 86,
  science: 73,
}

const groupStatus = {
  core: 'completed',
  hardware: 'in-progress',
  software: 'in-progress',
  science: 'pending',
} as const

type Status = 'completed' | 'in-progress' | 'pending'

function statusLabel(s: Status) {
  return s === 'completed' ? 'ACTIVE CORE' : s === 'in-progress' ? 'IN PRACTICE' : 'EXPLORING'
}

function statusStyles(s: Status) {
  switch (s) {
    case 'completed':   return 'text-foreground bg-foreground/10 border-foreground/30'
    case 'in-progress': return 'text-signal bg-signal/10 border-signal/30'
    case 'pending':     return 'text-muted-foreground bg-muted/20 border-border'
  }
}

export function NodeGraph() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [rotationAngle, setRotationAngle] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Auto-rotate
  useEffect(() => {
    if (!autoRotate) return
    const id = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.25) % 360).toFixed(3)))
    }, 50)
    return () => clearInterval(id)
  }, [autoRotate])

  const calculatePosition = useCallback(
    (index: number, total: number) => {
      const angle = ((index / total) * 360 + rotationAngle) % 360
      const radius = 185
      const radian = (angle * Math.PI) / 180
      const x = radius * Math.cos(radian)
      const y = radius * Math.sin(radian)
      const zIndex = Math.round(100 + 50 * Math.cos(radian))
      const opacity = Math.max(0.35, Math.min(1, 0.35 + 0.65 * ((1 + Math.sin(radian)) / 2)))
      return { x, y, zIndex, opacity }
    },
    [rotationAngle],
  )

  const handleNodeClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (expandedId === id) {
      setExpandedId(null)
      setAutoRotate(true)
    } else {
      setExpandedId(id)
      setAutoRotate(false)
    }
  }

  const handleContainerClick = () => {
    setExpandedId(null)
    setAutoRotate(true)
  }

  const nodeById = (id: string) => specNodes.find((n) => n.id === id)!

  // Only orbital nodes (non-core)
  const orbitalNodes = specNodes.filter((n) => n.group !== 'core')
  const coreNode = specNodes.find((n) => n.group === 'core')!

  return (
    <section
      id="network"
      className="relative border-t border-border py-24 md:py-32"
      aria-label="Speciality network"
    >
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <SectionHeading
          code="03 · Speciality Network"
          title="A living constellation"
          description="An orbital map of disciplines in motion. Click any node to surface its connections and detail."
          inverse
          magnetic
          hoverText="EXPLORE"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mt-14"
        >
          <div
            ref={containerRef}
            onClick={handleContainerClick}
            className="relative flex items-center justify-center overflow-hidden rounded-[3px] border border-border bg-card/40 lab-grid-fine"
            style={{ height: '520px' }}
          >
            {/* Orbit ring */}
            <div className="absolute w-[370px] h-[370px] rounded-full border border-white/8 pointer-events-none" />
            <div className="absolute w-[300px] h-[300px] rounded-full border border-white/4 pointer-events-none" />

            {/* Center node */}
            <div className="absolute z-20 flex flex-col items-center gap-2">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-foreground/40 bg-foreground/10 backdrop-blur-sm">
                <div className="absolute h-16 w-16 rounded-full border border-foreground/20 animate-ping opacity-40" />
                <div className="h-5 w-5 rounded-full bg-foreground/80" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70">
                {coreNode.label}
              </span>
            </div>

            {/* Orbital nodes */}
            {orbitalNodes.map((node, index) => {
              const pos = calculatePosition(index, orbitalNodes.length)
              const isExpanded = expandedId === node.id
              const isRelated = expandedId
                ? nodeById(expandedId).links.includes(node.id) || node.links.includes(expandedId)
                : false
              const status = groupStatus[node.group]
              const energy = groupEnergy[node.group]

              return (
                <div
                  key={node.id}
                  ref={(el) => { nodeRefs.current[node.id] = el }}
                  className="absolute transition-all duration-700 cursor-pointer"
                  style={{
                    transform: `translate(${pos.x}px, ${pos.y}px)`,
                    zIndex: isExpanded ? 200 : pos.zIndex,
                    opacity: expandedId && !isExpanded && !isRelated ? pos.opacity * 0.25 : 1,
                  }}
                  onClick={(e) => handleNodeClick(node.id, e)}
                >
                  {/* Pulse ring on related */}
                  {isRelated && (
                    <div className="absolute inset-0 -m-3 rounded-full border border-signal/50 animate-pulse" />
                  )}

                  {/* Node dot */}
                  <div
                    className={[
                      'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300',
                      isExpanded
                        ? 'bg-foreground text-background border-foreground scale-125 shadow-lg shadow-foreground/20'
                        : isRelated
                        ? 'bg-signal/20 text-signal border-signal/60'
                        : 'bg-card text-muted-foreground border-border/60 hover:border-foreground/40',
                    ].join(' ')}
                  >
                    <span className="text-[10px] font-bold">
                      {node.label.slice(0, 2).toUpperCase()}
                    </span>
                  </div>

                  {/* Label */}
                  <div
                    className={[
                      'absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-wider transition-all duration-300',
                      isExpanded ? 'text-foreground scale-110' : 'text-muted-foreground',
                    ].join(' ')}
                  >
                    {node.label}
                  </div>

                  {/* Expanded card */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-14 left-1/2 -translate-x-1/2 w-56 rounded-[3px] border border-border bg-card/95 backdrop-blur-lg shadow-xl shadow-black/40 overflow-hidden"
                    >
                      {/* Connector line */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-border" />

                      <div className="p-4">
                        {/* Status + group */}
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`rounded-[2px] border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] ${statusStyles(status)}`}
                          >
                            {statusLabel(status)}
                          </span>
                          <span className="font-mono text-[9px] text-muted-foreground">
                            {groupLabels[node.group]}
                          </span>
                        </div>

                        <h3 className="text-sm font-semibold tracking-tight">{node.label}</h3>
                        <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                          Linked to {node.links.length} adjacent {node.links.length === 1 ? 'discipline' : 'disciplines'}.
                        </p>

                        {/* Energy bar */}
                        <div className="mt-3 pt-3 border-t border-border">
                          <div className="flex items-center justify-between text-[10px] mb-1.5">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Zap className="h-2.5 w-2.5" />
                              Focus Level
                            </span>
                            <span className="font-mono text-foreground">{energy}%</span>
                          </div>
                          <div className="h-1 w-full rounded-full bg-border overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-foreground"
                              initial={{ width: 0 }}
                              animate={{ width: `${energy}%` }}
                              transition={{ duration: 0.6, ease: 'easeOut' }}
                            />
                          </div>
                        </div>

                        {/* Related nodes */}
                        {node.links.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-border">
                            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                              Connected
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {node.links.map((lid) => (
                                <button
                                  key={lid}
                                  className="flex items-center gap-1 rounded-[2px] border border-border px-2 py-0.5 text-[10px] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setExpandedId(lid)
                                  }}
                                >
                                  {nodeById(lid).label}
                                  <ArrowRight className="h-2.5 w-2.5" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              )
            })}

            {/* Legend label */}
            <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              ORBITAL · {specNodes.length} nodes · {autoRotate ? 'live' : 'paused'}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
