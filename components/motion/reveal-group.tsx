'use client'

import type { ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

// children é restrito a ReactNode (nunca MotionValue) porque o fallback de
// reduced-motion abaixo renderiza um <div> puro, que não aceita MotionValue.
type RevealGroupProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children: ReactNode
  stagger?: number
  delayChildren?: number
}

// Par compound para stagger de listas/grids (cards de benefícios, blocos
// "para quem é", passos da metodologia, thumbnails do Instagram etc).
// RevealGroup controla o viewport trigger + stagger; RevealItem só declara
// a variante que cada filho anima.
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  ...props
}: RevealGroupProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainer(stagger, delayChildren)}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className, ...props }: HTMLMotionProps<'div'>) {
  return (
    <motion.div variants={fadeUp} className={className} {...props}>
      {children}
    </motion.div>
  )
}
