'use client'

import { useRef, type ReactNode } from 'react'
import { animate } from 'animejs'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

// "Pop" do ícone quando o card inteiro recebe hover (Anime.js): escala
// com overshoot curto e uma inclinação mínima, disparada por evento —
// nunca em loop. Fica em cima do hover de cor que já existe e não
// compete com o tilt 3D do CardTilt (que anima o card, não o ícone).
//
// O wrapper cobre a área de hover (o card) e anima só o elemento
// marcado com [data-anime-pop] lá dentro — por isso o listener fica
// aqui e não no próprio ícone, que é pequeno demais para ser um alvo
// de hover confiável.
//
// Não usa useAnimeScope porque não há setup no mount: a animação é
// imperativa e o Anime.js já substitui tweens do mesmo alvo.
export function AnimeIconPop({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  function handleEnter() {
    if (reducedMotion || !ref.current) return
    const icon = ref.current.querySelector('[data-anime-pop]')
    if (!icon) return
    animate(icon, {
      scale: [1, 1.18, 1],
      rotate: [0, -6, 0],
      duration: 650,
      ease: 'outBack(2)',
    })
  }

  return (
    <div ref={ref} onPointerEnter={handleEnter} className={cn('h-full', className)}>
      {children}
    </div>
  )
}
