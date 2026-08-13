'use client'

import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from 'motion/react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

const SPRING = { stiffness: 150, damping: 15, mass: 0.1 }

// children é restrito a ReactNode (nunca MotionValue) porque o fallback de
// reduced-motion abaixo renderiza um <div> puro, que não aceita MotionValue.
type MagneticProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children: ReactNode
  strength?: number
}

// Wrapper magnético (Aceternity "Magnetic Button"): o filho deriva
// sutilmente em direção ao cursor ao passar por perto. Usa
// useMotionValue/useSpring — nunca useState — para não re-renderizar a
// árvore React a cada movimento de mouse.
export function Magnetic({ children, strength = 0.35, className, ...props }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, SPRING)
  const y = useSpring(rawY, SPRING)

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    rawX.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    rawY.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
      data-cursor="cta"
      {...props}
    >
      {children}
    </motion.div>
  )
}
