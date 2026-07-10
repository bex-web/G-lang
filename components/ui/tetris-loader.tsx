'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

// ── Tetromino shapes ──────────────────────────────────────────────────────────
const TETROMINOES = [
  // I
  { shape: [[1, 1, 1, 1]], color: '#f1ede5' },
  // O
  { shape: [[1, 1], [1, 1]], color: '#cec7bc' },
  // T
  { shape: [[0, 1, 0], [1, 1, 1]], color: '#a09890' },
  // S
  { shape: [[0, 1, 1], [1, 1, 0]], color: '#787068' },
  // Z
  { shape: [[1, 1, 0], [0, 1, 1]], color: '#565050' },
  // J
  { shape: [[1, 0, 0], [1, 1, 1]], color: '#f1ede5' },
  // L
  { shape: [[0, 0, 1], [1, 1, 1]], color: '#cec7bc' },
]

const COLS = 8
const ROWS = 12
const SPEEDS = { slow: 600, medium: 400, fast: 200 }
const SIZES = { sm: 20, md: 28, lg: 36 }

type Cell = { filled: boolean; color: string }
type Board = Cell[][]

function emptyBoard(): Board {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ filled: false, color: '' })),
  )
}

interface Piece {
  shape: number[][]
  color: string
  x: number
  y: number
}

function randomPiece(): Piece {
  const t = TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)]
  return {
    shape: t.shape,
    color: t.color,
    x: Math.floor((COLS - t.shape[0].length) / 2),
    y: 0,
  }
}

function canPlace(board: Board, piece: Piece, dx = 0, dy = 0): boolean {
  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      if (!piece.shape[r][c]) continue
      const nr = piece.y + r + dy
      const nc = piece.x + c + dx
      if (nr >= ROWS || nc < 0 || nc >= COLS) return false
      if (nr >= 0 && board[nr][nc].filled) return false
    }
  }
  return true
}

function lockPiece(board: Board, piece: Piece): Board {
  const next = board.map((row) => row.map((cell) => ({ ...cell })))
  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      if (!piece.shape[r][c]) continue
      const nr = piece.y + r
      const nc = piece.x + c
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
        next[nr][nc] = { filled: true, color: piece.color }
      }
    }
  }
  return next
}

function clearLines(board: Board): Board {
  const remaining = board.filter((row) => !row.every((c) => c.filled))
  const cleared = ROWS - remaining.length
  const empty = Array.from({ length: cleared }, () =>
    Array.from({ length: COLS }, () => ({ filled: false, color: '' })),
  )
  return [...empty, ...remaining]
}

// ── Component ──────────────────────────────────────────────────────────────────
interface TetrisLoadingProps {
  size?: 'sm' | 'md' | 'lg'
  speed?: 'slow' | 'medium' | 'fast'
  className?: string
  onComplete?: () => void
  duration?: number // ms to run before calling onComplete
}

export default function TetrisLoading({
  size = 'md',
  speed = 'medium',
  className,
  onComplete,
  duration = 3000,
}: TetrisLoadingProps) {
  const [board, setBoard] = useState<Board>(emptyBoard)
  const [current, setCurrent] = useState<Piece>(randomPiece)
  const cellSize = SIZES[size]
  const interval = SPEEDS[speed]

  const boardRef = useRef(board)
  const currentRef = useRef(current)
  boardRef.current = board
  currentRef.current = current

  const step = useCallback(() => {
    const b = boardRef.current
    const p = currentRef.current
    if (canPlace(b, p, 0, 1)) {
      setCurrent((prev) => ({ ...prev, y: prev.y + 1 }))
    } else {
      const locked = lockPiece(b, p)
      const cleaned = clearLines(locked)
      setBoard(cleaned)
      setCurrent(randomPiece())
    }
  }, [])

  useEffect(() => {
    const id = setInterval(step, interval)
    return () => clearInterval(id)
  }, [step, interval])

  // call onComplete after duration
  useEffect(() => {
    if (!onComplete) return
    const id = setTimeout(onComplete, duration)
    return () => clearTimeout(id)
  }, [onComplete, duration])

  // Render: merge board + falling piece into display grid
  const display: Cell[][] = board.map((row) => row.map((cell) => ({ ...cell })))
  for (let r = 0; r < current.shape.length; r++) {
    for (let c = 0; c < current.shape[r].length; c++) {
      if (!current.shape[r][c]) continue
      const nr = current.y + r
      const nc = current.x + c
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
        display[nr][nc] = { filled: true, color: current.color }
      }
    }
  }

  return (
    <div
      className={cn('inline-flex flex-col', className)}
      role="status"
      aria-label="Loading"
    >
      <div
        className="border border-border overflow-hidden"
        style={{
          width: cellSize * COLS,
          height: cellSize * ROWS,
          background: 'var(--graphite-black, #0b0b0b)',
        }}
      >
        {display.map((row, ri) => (
          <div key={ri} className="flex">
            {row.map((cell, ci) => (
              <div
                key={ci}
                style={{
                  width: cellSize,
                  height: cellSize,
                  background: cell.filled ? cell.color : 'transparent',
                  borderRight: '1px solid rgba(255,255,255,0.03)',
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  boxShadow: cell.filled ? `inset 1px 1px 0 rgba(255,255,255,0.15), inset -1px -1px 0 rgba(0,0,0,0.3)` : 'none',
                  transition: 'background 0.1s',
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  )
}

// ── Site Loader wrapper (fullscreen overlay) ──────────────────────────────────
interface SiteLoaderProps {
  onDone: () => void
}

export function SiteLoader({ onDone }: SiteLoaderProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <TetrisLoading size="sm" speed="fast" onComplete={onDone} duration={2800} />

      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Loading…
      </p>
    </motion.div>
  )
}
