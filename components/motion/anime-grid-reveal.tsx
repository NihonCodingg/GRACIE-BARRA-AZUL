'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { useInView } from 'motion/react'
import { animate, stagger, utils } from 'animejs'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

const ITEM_SELECTOR = '[data-anime-grid-item]'

// Entrada em diagonal para grids de imagem (Anime.js): cada tile chega
// deslocado no eixo X e Y ao mesmo tempo, em cascata, com um leve
// scale — assinatura diferente do fade-up vertical usado no resto da
// página.
//
// Os filhos ficam visíveis por padrão e só são escondidos depois que o
// JS monta: se algo falhar no meio do caminho, o conteúdo continua
// legível em vez de sumir (ao contrário de esconder via CSS no SSR).
export function AnimeGridReveal({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !ref.current) return
    utils.set(ref.current.querySelectorAll(ITEM_SELECTOR), {
      opacity: 0,
      x: -28,
      y: 28,
      scale: 0.94,
    })
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion || !ref.current) return
    const items = ref.current.querySelectorAll(ITEM_SELECTOR)

    if (inView) {
      animate(items, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 900,
        delay: stagger(70),
        ease: 'outExpo',
      })
      return
    }

    // Rede de segurança: estes tiles carregam conteúdo real (o feed do
    // Instagram), então nunca podem ficar presos invisíveis se o
    // IntersectionObserver não disparar por qualquer motivo (aba em
    // segundo plano no primeiro paint, navegador exótico, etc).
    const fallback = window.setTimeout(() => {
      utils.set(items, { opacity: 1, x: 0, y: 0, scale: 1 })
    }, 3000)
    return () => window.clearTimeout(fallback)
  }, [inView, reducedMotion])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
