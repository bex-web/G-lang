'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode, HTMLAttributes } from 'react'

type ValidTag = 'div' | 'li' | 'p' | 'span' | 'article'

export function MotionItem({
  children,
  className,
  variants,
  as = 'div',
  ...rest
}: {
  children: ReactNode
  className?: string
  variants: Variants
  as?: ValidTag
} & HTMLAttributes<HTMLElement>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = motion[as] as any
  return (
    <Tag className={className} variants={variants} {...rest}>
      {children}
    </Tag>
  )
}
