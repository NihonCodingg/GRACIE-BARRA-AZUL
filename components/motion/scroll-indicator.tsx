'use client'

import { animate, svg } from 'animejs'
import { useAnimeScope } from '@/hooks/use-anime-scope'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// Indicador de scroll do Hero: um traço vertical que se desenha de cima
// para baixo, some, e recomeça. Usa svg.createDrawable do Anime.js — que
// resolve stroke-dasharray/offset sozinho e é claramente melhor que
// orquestrar isso à mão em GSAP ou Motion para um SVG isolado.
export function ScrollIndicator() {
  const reducedMotion = useReducedMotion()

  const rootRef = useAnimeScope<HTMLDivElement>(() => {
    animate(svg.createDrawable('.scroll-indicator-line'), {
      draw: ['0 0', '0 1', '1 1'],
      duration: 2200,
      ease: 'inOutQuad',
      loop: true,
    })
  })

  // Sem o traço animado o indicador não comunica nada — melhor não
  // renderizar do que deixar uma linha estática decorativa.
  if (reducedMotion) return null

  return (
    <div
      ref={rootRef}
      className="absolute inset-x-0 bottom-8 hidden justify-center sm:flex"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-3">
        <span className="font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Role
        </span>
        <svg width="2" height="56" viewBox="0 0 2 56" fill="none">
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="56"
            stroke="var(--color-primary)"
            strokeWidth="2"
            className="scroll-indicator-line"
          />
        </svg>
      </div>
    </div>
  )
}
