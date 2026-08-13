'use client'

import { useRef } from 'react'
import Image, { type ImageProps } from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

type ParallaxImageProps = Omit<ImageProps, 'fill'> & { strength?: number }

// Substituto de <Image fill> para fundos de seção com um parallax sutil
// ligado ao scroll (scrub, sem easing — segue a posição 1:1). O wrapper
// externo tem overflow-hidden e o interno é sobredimensionado (inset -10%)
// para que o translateY do parallax nunca revele borda vazia da imagem.
export function ParallaxImage({ strength = 15, className, ...imageProps }: ParallaxImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reducedMotion || !wrapperRef.current) return
      const parent = wrapperRef.current.parentElement
      if (!parent) return

      gsap.fromTo(
        wrapperRef.current,
        { yPercent: -strength },
        {
          yPercent: strength,
          ease: 'none',
          scrollTrigger: {
            trigger: parent,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === parent) st.kill()
        })
      }
    },
    { scope: wrapperRef, dependencies: [reducedMotion, strength] },
  )

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div ref={wrapperRef} className="absolute inset-[-10%]">
        <Image {...imageProps} fill className={`object-cover object-center ${className ?? ''}`} />
      </div>
    </div>
  )
}
