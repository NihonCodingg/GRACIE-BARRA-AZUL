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
//
// O background da lente passa pelo otimizador do Next em vez de apontar
// para o arquivo em /public. Sem isso, uma lupa que talvez ninguém use
// puxava o PNG original: as fotos do professor e da graduação têm 2 MB
// cada, mais que o resto da página somado.
//
// A largura precisa ser um dos deviceSizes do Next (640, 750, 828, 1080,
// 1200, 1920, 2048, 3840) — qualquer outro valor devolve 400. 1920 cobre
// com folga o zoom de 1.6x usado aqui.
function lensBackground(src: string) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=1920&q=75`
}

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
      {/* Montada só a partir do primeiro hover. Antes ela existia sempre
          com opacity 0, e um background-image declarado é baixado assim
          que o elemento é renderizado — quem só rolava a página pagava
          pela lupa sem nunca vê-la. */}
      {hovering && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full border-2 border-primary shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          style={{
            x,
            y,
            width: lensSize,
            height: lensSize,
            backgroundImage: `url(${lensBackground(src)})`,
            backgroundSize: `${zoomFactor * 100}%`,
            backgroundPosition,
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
    </div>
  )
}
