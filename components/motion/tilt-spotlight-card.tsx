'use client'

import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from 'motion/react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

const TILT_SPRING = { stiffness: 200, damping: 20 }

// children é restrito a ReactNode (nunca MotionValue) porque o fallback de
// reduced-motion abaixo renderiza um <div> puro, que não aceita MotionValue.
type TiltSpotlightCardProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children: ReactNode
  tiltStrength?: number
}

// Card Tilt + Spotlight Card (ScrollX UI): inclinação 3D que segue o
// mouse + brilho radial (cor da marca) que acompanha o cursor sobre o
// card. Tudo via useMotionValue/useTransform — sem useState por frame.
export function TiltSpotlightCard({
  children,
  className,
  tiltStrength = 6,
  ...props
}: TiltSpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rotateX = useSpring(rawRotateX, TILT_SPRING)
  const rotateY = useSpring(rawRotateY, TILT_SPRING)
  const spotlightX = useMotionValue(50)
  const spotlightY = useMotionValue(50)
  const background = useTransform([spotlightX, spotlightY], (latest) => {
    const [sx, sy] = latest as [number, number]
    return `radial-gradient(280px circle at ${sx}% ${sy}%, var(--color-primary) 0%, transparent 70%)`
  })

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rawRotateY.set((px - 0.5) * tiltStrength * 2)
    rawRotateX.set((0.5 - py) * tiltStrength * 2)
    spotlightX.set(px * 100)
    spotlightY.set(py * 100)
  }

  function handleMouseLeave() {
    rawRotateX.set(0)
    rawRotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`group/tilt relative ${className ?? ''}`}
      {...props}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-15"
        style={{ background }}
      />
      <div className="relative z-10 h-full" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  )
}
