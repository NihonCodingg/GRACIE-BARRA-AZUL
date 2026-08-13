'use client'

import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// Beam vertical que acompanha o scroll ao lado de uma lista de passos
// (Aceternity "Tracing Beam" / "Timeline", adaptado). O filho deve ter
// padding-left suficiente para não sobrepor a linha.
export function TracingBeam({ children, className }: { children: ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const beamRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reducedMotion || !containerRef.current || !beamRef.current) return
      const tween = gsap.fromTo(
        beamRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: true,
          },
        },
      )
      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  )

  return (
    <div ref={containerRef} className={`relative ${className ?? ''}`}>
      <div className="absolute left-0 top-1 h-full w-px bg-border" aria-hidden="true">
        <div ref={beamRef} className="w-full origin-top bg-primary" style={{ height: '100%', transform: 'scaleY(0)' }} />
      </div>
      {children}
    </div>
  )
}
