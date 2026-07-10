'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export type IconGridItem = {
  id: string
  icon: React.ReactNode
  name: string
  href: string
}

interface IconGridProps {
  items: IconGridItem[]
  className?: string
}

export function IconGrid({ items, className }: IconGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5',
        className
      )}
    >
      {items.map((item, index) => (
        <motion.a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="group relative aspect-square"
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-accent/40 hover:shadow-lg">
            {item.icon}
            <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
              {item.name}
            </span>
          </div>
        </motion.a>
      ))}
    </div>
  )
}

interface BoxyAppIconsProps {
  items: IconGridItem[]
  className?: string
}

export default function BoxyAppIcons({ items, className }: BoxyAppIconsProps) {
  return (
    <div className={cn('w-full', className)}>
      <IconGrid items={items} />
    </div>
  )
}
