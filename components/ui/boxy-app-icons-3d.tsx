'use client'

import React from 'react'

export type IconGridItem = {
  id: string
  icon?: React.ReactNode
  name: string
  href: string
}

// Icon wrapper for consistent sizing
export const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="h-5 w-5">{children}</div>
)

// ── SVG icons as paths for each social ────────────────────────────────────────
// These are simplified icon paths rendered inside the isometric face
const IconPaths: Record<string, React.ReactNode> = {
  email: (
    <path
      fill="#9a9fa8"
      d="M6 4h12c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v.51l6 3.99 6-3.99V6H6zm0 12h12V9.49l-6 4-6-4V18z"
    />
  ),
  whatsapp: (
    <path
      fill="#9a9fa8"
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
    />
  ),
  linkedin: (
    <path
      fill="#9a9fa8"
      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z"
    />
  ),
  github: (
    <path
      fill="#9a9fa8"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  ),
  instagram: (
    <path
      fill="#9a9fa8"
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
    />
  ),
}

interface BoxyAppIcons3DProps {
  items: IconGridItem[]
  className?: string
}

// ── Isometric box positions (2x scale of reference: viewBox 0 0 498 288) ──────
// Original had 6 icons in 3-row staggered layout. We use 5 in same stagger.
// Each box offset matches reference positions × 2.
const BOX_POSITIONS = [
  // row 0 (top-right)
  { cx: 290, cy: 68.054 },
  // row 1 left & right
  { cx: 88,  cy: 118.054 },
  { cx: 262, cy: 118.054 },
  // row 2 left & right
  { cx: 0,   cy: 168.054 },
  { cx: 176, cy: 168.054 },
]

// Graphite black face colors — consistent across all boxes
const FACE_DARK  = '#1a1a1a'  // side faces
const FACE_TOP   = '#222222'  // top/isometric face
const FACE_FILL  = '#1f1f1f'  // front face fill

export default function BoxyAppIcons3D({ items, className }: BoxyAppIcons3DProps) {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 498 288"
        className="w-full max-w-lg"
      >
        <defs>
          {/* Shared gradients matching reference, recolored graphite */}
          {[0, 1, 2, 3, 4].map((i) => (
            <linearGradient
              key={i}
              id={`paint${i}_linear`}
              x1="0.037"
              y1="-0.037"
              x2="21.354"
              y2="42.747"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor={FACE_TOP} />
              <stop offset="1" stopColor={FACE_TOP} />
            </linearGradient>
          ))}

          {/* Clip paths — 2× reference transforms */}
          {items.slice(0, 5).map((_, idx) => {
            const pos = BOX_POSITIONS[idx]
            return (
              <clipPath key={idx} id={`clip_box_${idx}`}>
                <rect
                  transform={`matrix(0.866025 -0.5 0.866025 0.5 ${pos.cx} ${pos.cy})`}
                  fill="white"
                  width="136.215"
                  height="135.971"
                />
              </clipPath>
            )
          })}

          {/* Icon clip paths (centered on each box) */}
          {items.slice(0, 5).map((_, idx) => {
            const pos = BOX_POSITIONS[idx]
            return (
              <clipPath key={`iclip_${idx}`} id={`clip_icon_${idx}`}>
                <rect
                  transform={`matrix(0.866025 -0.5 0.866025 0.5 ${pos.cx + 90} ${pos.cy + 15.282})`}
                  fill="white"
                  width="32"
                  height="32"
                />
              </clipPath>
            )
          })}
        </defs>

        {items.slice(0, 5).map((item, idx) => {
          const pos = BOX_POSITIONS[idx]
          // Offsets derived by doubling reference
          const rx = pos.cx + 55.85  // right face origin x
          const ry = pos.cy + 15.391 // right face origin y
          const lx = pos.cx + 117.85 // left face origin x (mirror)
          const ly = pos.cy + 15.391
          // Top face path — doubled coords from reference pattern
          const tx = pos.cx + 0.52
          const ty = pos.cy + 0.273
          const mx = pos.cx + 61      // mid/pivot x
          const my = pos.cy + 31      // mid/pivot y

          return (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noreferrer"
            >
              <g
                clipPath={`url(#clip_box_${idx})`}
                className="group transition-transform duration-300 ease-in-out hover:-translate-y-5 cursor-pointer"
              >
                <g>
                  {/* Right side face */}
                  <rect
                    fill={FACE_DARK}
                    transform={`matrix(0.866025 0.5 0 1 ${rx} ${ry})`}
                    width="71.591"
                    height="77.326"
                  />
                  {/* Left side face */}
                  <rect
                    fill={FACE_DARK}
                    transform={`matrix(-0.866025 0.5 0 1 ${lx} ${ly})`}
                    width="71.591"
                    height="77.326"
                  />
                  {/* Top face */}
                  <path
                    fill={FACE_TOP}
                    className="group-hover:fill-[#2a2a2a] transition-colors duration-300"
                    d={`M ${tx + 0.52} ${ty}
                        C ${tx + 0.37} ${ty - 0.11} ${tx} ${ty - 0.02} ${tx} ${ty + 0.32}
                        V ${my + 29.66} L ${mx} ${my + 59.66} L ${mx + 61} ${my + 29.66}
                        V ${ty + 0.21}
                        C ${mx + 61} ${ty} ${mx + 60.85} ${ty - 0.09} ${mx + 60.66} ${ty + 0.02}
                        L ${mx} ${ty + 35.24} Z`}
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                  {/* Front isometric face */}
                  <rect
                    fill={`url(#paint${idx}_linear)`}
                    transform={`matrix(0.866025 -0.5 0.866025 0.5 ${pos.cx + 56.084} ${pos.cy + 0.263})`}
                    width="69.631"
                    height="69.573"
                    x="1.732"
                  />
                  {/* Front face stroke */}
                  <rect
                    stroke="#3C4149"
                    strokeWidth="0.5"
                    transform={`matrix(0.866025 -0.5 0.866025 0.5 ${pos.cx + 56.084} ${pos.cy + 0.263})`}
                    width="69.631"
                    height="69.573"
                    x="1.732"
                  />
                  {/* Inner rounded rect (icon border) */}
                  <rect
                    stroke="#4a5060"
                    strokeWidth="0.5"
                    className="group-hover:stroke-[#6a7080] transition-colors duration-300"
                    transform={`matrix(0.866025 -0.5 0.866025 0.5 ${pos.cx + 72.944} ${pos.cy - 0.185})`}
                    rx="3.5"
                    width="51"
                    height="51"
                    x="0.866025"
                  />

                  {/* Icon rendered with isometric transformation to match box perspective */}
                  <g transform={`matrix(0.866025 -0.5 0.866025 0.5 ${pos.cx + 56.084} ${pos.cy + 0.263})`}>
                    <svg
                      x="18.5"
                      y="18.5"
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      className="pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {IconPaths[item.id] || null}
                    </svg>
                  </g>
                </g>
              </g>
            </a>
          )
        })}
      </svg>
    </div>
  )
}
