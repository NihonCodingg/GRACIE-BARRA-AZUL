'use client'

import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { EASE_CINEMATIC } from '@/lib/motion'

// children é restrito a ReactNode (nunca MotionValue) porque o fallback de
// reduced-motion abaixo renderiza um <div> puro, que não aceita MotionValue.
export function MaskReveal({
  children,
  className,
  delay = 0,
  duration = 1,
  once = true,
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
}) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, ease: EASE_CINEMATIC, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
