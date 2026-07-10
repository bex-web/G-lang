'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const MILK = '241, 237, 229'

export type TimelineNode = {
  id: number
  title: string
  date: string
  content: string
  category: string
  icon: LucideIcon
  relatedIds: number[]
  status: 'completed' | 'in-progress' | 'pending'
  energy: number
}

type SimNode = TimelineNode & {
  angle: number
  radius: number
  vAngle: number
  vRadius: number
  targetRadius: number
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineNode[]
  className?: string
}

export default function RadialOrbitalTimeline({
  timelineData,
  className,
}: RadialOrbitalTimelineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<SimNode[]>([])
  const pointer = useRef<{ x: number; y: number; active: boolean }>({
    x: -1,
    y: -1,
    active: false,
  })
  const hoverRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)
  const [active, setActive] = useState<number | null>(null)
  const reduced = useReducedMotion()

  // Initialize nodes with orbital positions
  useEffect(() => {
    const coreNode = timelineData.find((n) => n.energy === 100)
    nodesRef.current = timelineData.map((n, i) => {
      const isCore = n.id === coreNode?.id
      const angle = isCore ? 0 : (i / (timelineData.length - 1)) * Math.PI * 2
      const radius = isCore ? 0 : 30 + (n.energy / 100) * 15
      return {
        ...n,
        angle,
        radius,
        vAngle: isCore ? 0 : 0.001 + Math.random() * 0.002,
        vRadius: 0,
        targetRadius: radius,
      }
    })
  }, [timelineData])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0
    let H = 0
    let dpr = 1
    let centerX = 0
    let centerY = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = wrap.getBoundingClientRect()
      W = rect.width
      H = rect.height
      centerX = W / 2
      centerY = H / 2
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    const HOVER_R = 25

    const step = () => {
      const nodes = nodesRef.current
      const p = pointer.current

      // Determine hovered node
      let hovered: SimNode | null = null
      if (p.active) {
        let best = Infinity
        for (const n of nodes) {
          const scale = Math.min(W, H) / 100
          const x = centerX + Math.cos(n.angle) * n.radius * scale
          const y = centerY + Math.sin(n.angle) * n.radius * scale
          const dx = x - p.x
          const dy = y - p.y
          const d = Math.hypot(dx, dy)
          if (d < best && d < HOVER_R) {
            best = d
            hovered = n
          }
        }
      }

      const hoveredId = hovered?.id ?? null
      if (hoveredId !== hoverRef.current) {
        hoverRef.current = hoveredId
        setActive(hoveredId)
      }

      // Physics simulation
      if (!reduced) {
        for (const n of nodes) {
          // Core node uses physics
          if (n.energy === 100) {
            if (hovered && n.id === hovered.id) {
              // Freeze when hovered
              n.vAngle *= 0.4
              n.vRadius *= 0.4
            } else {
              // Random drift
              n.vAngle += (Math.random() - 0.5) * 0.0003
              n.vRadius += (Math.random() - 0.5) * 0.05
              n.vAngle *= 0.95
              n.vRadius *= 0.92
              n.angle += n.vAngle
              n.radius += n.vRadius
              // Constrain radius
              n.radius = Math.max(0, Math.min(5, n.radius))
            }
          } else {
            // Orbital nodes
            if (hovered) {
              if (n.id === hovered.id) {
                // Slow down when hovered
                n.vAngle *= 0.3
              } else if (n.relatedIds.includes(hovered.id)) {
                // Related nodes move toward hovered
                const hoveredNode = nodes.find((m) => m.id === hovered.id)
                if (hoveredNode) {
                  const angleDiff = hoveredNode.angle - n.angle
                  n.vAngle += Math.sign(angleDiff) * 0.0002
                  n.targetRadius = n.radius * 0.85
                }
              }
            } else {
              // Normal orbital motion
              n.targetRadius = 30 + (n.energy / 100) * 15
            }

            // Spring toward target radius
            n.vRadius += (n.targetRadius - n.radius) * 0.01
            n.vRadius *= 0.9
            n.radius += n.vRadius

            // Update angle
            const baseSpeed = 0.001 + (1 - n.energy / 100) * 0.002
            n.angle += baseSpeed * (hovered && n.id === hovered.id ? 0.2 : 1)
          }
        }
      }

      // Draw
      ctx.clearRect(0, 0, W, H)

      const scale = Math.min(W, H) / 100

      // Draw connections
      for (const n of nodes) {
        const x1 = centerX + Math.cos(n.angle) * n.radius * scale
        const y1 = centerY + Math.sin(n.angle) * n.radius * scale

        for (const relId of n.relatedIds) {
          const rel = nodes.find((m) => m.id === relId)
          if (!rel) continue
          const x2 = centerX + Math.cos(rel.angle) * rel.radius * scale
          const y2 = centerY + Math.sin(rel.angle) * rel.radius * scale

          const lit = !hoveredId || n.id === hoveredId || relId === hoveredId
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.strokeStyle = `rgba(${MILK}, ${lit ? 0.4 : 0.1})`
          ctx.lineWidth = lit ? 1.5 : 0.8
          ctx.stroke()
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const x = centerX + Math.cos(n.angle) * n.radius * scale
        const y = centerY + Math.sin(n.angle) * n.radius * scale
        const isCore = n.energy === 100
        const connected =
          !hoveredId || n.id === hoveredId || n.relatedIds.includes(hoveredId)

        const r = isCore ? 10 : 7
        const alpha = connected ? 1 : 0.3

        // Glow for hovered
        if (n.id === hoveredId) {
          ctx.beginPath()
          ctx.arc(x, y, r + 10, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${MILK}, 0.3)`
          ctx.lineWidth = 2
          ctx.stroke()
        }

        // Node circle
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)

        // Status-based color
        let fillAlpha = alpha * 0.9
        if (n.status === 'completed') fillAlpha *= 1
        else if (n.status === 'in-progress') fillAlpha *= 0.7
        else fillAlpha *= 0.4

        ctx.fillStyle = `rgba(${MILK}, ${fillAlpha})`
        ctx.fill()
        ctx.strokeStyle = isCore
          ? `rgba(255, 200, 100, ${alpha})`
          : 'rgba(11, 11, 11, 0.8)'
        ctx.lineWidth = 2
        ctx.stroke()

        // Label for core or hovered
        if (isCore || n.id === hoveredId) {
          ctx.font = '600 11px Inter, ui-sans-serif, system-ui, sans-serif'
          ctx.textAlign = 'center'
          ctx.fillStyle = `rgba(${MILK}, ${alpha})`
          ctx.fillText(n.title, x, y - r - 12)
        }
      }

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }
    }
    const onLeave = () => {
      pointer.current.active = false
    }
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced])

  const activeNode = active ? timelineData.find((n) => n.id === active) : null

  return (
    <div className={cn('grid gap-8 lg:grid-cols-12', className)}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        ref={wrapRef}
        className="lab-grid-fine relative aspect-square overflow-hidden rounded-[3px] border border-border bg-card/40 lg:col-span-8"
        data-cursor="hover"
      >
        <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
        <p className="sr-only">
          Interactive timeline with {timelineData.length} nodes
        </p>
        <div className="pointer-events-none absolute bottom-3 left-3 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          ORBITAL · {timelineData.length} nodes · live
        </div>
      </motion.div>

      {/* Detail panel */}
      <div className="lg:col-span-4">
        <div className="rounded-[3px] border border-border bg-card/40 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {activeNode ? 'Selected' : 'Overview'}
          </p>
          {activeNode ? (
            <div className="mt-4">
              <div className="flex items-center gap-3">
                <activeNode.icon className="h-6 w-6 text-signal" />
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {activeNode.title}
                </h3>
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {activeNode.category} · {activeNode.date}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {activeNode.content}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Status:
                </span>
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-xs font-semibold',
                    activeNode.status === 'completed' &&
                      'bg-green-500/20 text-green-400',
                    activeNode.status === 'in-progress' &&
                      'bg-yellow-500/20 text-yellow-400',
                    activeNode.status === 'pending' &&
                      'bg-gray-500/20 text-gray-400'
                  )}
                >
                  {activeNode.status}
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Hover over a node to see details. The central node uses physics
                while satellites orbit autonomously.
              </p>
              <ul className="mt-4 space-y-2">
                {['completed', 'in-progress', 'pending'].map((status) => (
                  <li key={status} className="flex items-center gap-3 text-sm">
                    <span
                      className={cn(
                        'inline-block h-2.5 w-2.5 rounded-full',
                        status === 'completed' && 'bg-green-500',
                        status === 'in-progress' && 'bg-yellow-500',
                        status === 'pending' && 'bg-gray-500'
                      )}
                    />
                    <span className="capitalize text-foreground">{status}</span>
                    <span className="ml-auto text-xs font-medium text-muted-foreground">
                      {timelineData.filter((n) => n.status === status).length}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
