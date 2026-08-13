import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'outline'
type Size = 'default' | 'lg'

const base =
  'group inline-flex items-center justify-center gap-2 rounded-sm font-display font-semibold uppercase tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_0_1px_var(--color-primary)] hover:shadow-[0_8px_30px_-8px_var(--color-primary)]',
  outline:
    'border border-border bg-transparent text-foreground hover:border-primary hover:text-primary',
}

const sizes: Record<Size, string> = {
  default: 'h-11 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
}

export function CtaButton({
  href,
  children,
  variant = 'primary',
  size = 'default',
  className,
  external = true,
  ariaLabel,
}: {
  href: string
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  external?: boolean
  ariaLabel?: string
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </a>
  )
}
