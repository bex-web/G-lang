import { Reveal } from '@/components/common/reveal'
import { MagneticText } from '@/components/ui/magnetic-text'
import { cn } from '@/lib/utils'

export function SectionHeading({
  code,
  title,
  description,
  align = 'left',
  className,
  inverse = false,
  magnetic = true,
  hoverText,
}: {
  code: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  inverse?: boolean
  magnetic?: boolean
  hoverText?: string
}) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-signal">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" />
        {code}
      </div>

      <div className={cn('overflow-hidden')}>
        {magnetic ? (
          <h2
            className={cn(
              'text-balance text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl',
            )}
          >
            <MagneticText
              text={title}
              hoverText={hoverText ?? title.toUpperCase()}
              className={cn(
                'text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl',
              )}
            />
          </h2>
        ) : (
          <h2
            className={cn(
              'text-balance text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl',
            )}
          >
            {title}
          </h2>
        )}
      </div>

      {description ? (
        <p
          className={cn(
            'max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
