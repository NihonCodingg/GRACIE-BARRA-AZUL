'use client'

import type { ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { EASE_CINEMATIC, DURATION } from '@/lib/motion'

// children é restrito a ReactNode (nunca MotionValue) porque o fallback de
// reduced-motion abaixo renderiza um <div> puro, que não aceita MotionValue.
type RevealProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children: ReactNode
  delay?: number
  y?: number
}

// Reveal de entrada em viewport (fade + slide-up) para um único elemento.
// Usado como "slot" client dentro de seções que continuam Server Component.
export function Reveal({ children, delay = 0, y = 24, className, ...props }: RevealProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: DURATION.base, ease: EASE_CINEMATIC, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
