'use client'

import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'motion/react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// Lente de zoom que segue o cursor sobre uma imagem (Aceternity "Lens").
// `children` deve ser a <Image> normal já renderizada (next/image com
// fill) — a lente é uma camada extra por cima, com a mesma imagem como
// background ampliado. Só a visibilidade (boolean) usa useState; a
// posição contínua do mouse vai inteira por motion values.
export function Lens({
  src,
  zoomFactor = 1.6,
  lensSize = 170,
  children,
  className,
}: {
  src: string
  zoomFactor?: number
  lensSize?: number
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const reducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const bgPosX = useMotionValue(50)
  const bgPosY = useMotionValue(50)
  const backgroundPosition = useMotionTemplate`${bgPosX}% ${bgPosY}%`

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left
    const relY = e.clientY - rect.top
    x.set(relX - lensSize / 2)
    y.set(relY - lensSize / 2)
    bgPosX.set((relX / rect.width) * 100)
    bgPosY.set((relY / rect.height) * 100)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      data-cursor="image"
      className={`relative ${className ?? ''}`}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full border-2 border-primary shadow-2xl"
        style={{
          x,
          y,
          width: lensSize,
          height: lensSize,
          backgroundImage: `url(${src})`,
          backgroundSize: `${zoomFactor * 100}%`,
          backgroundPosition,
          backgroundRepeat: 'no-repeat',
          opacity: hovering ? 1 : 0,
        }}
      />
    </div>
  )
}
