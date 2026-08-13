'use client'

import { useEffect, useRef, type ElementType, type ReactNode } from 'react'
import { useInView } from 'motion/react'
import { animate, stagger, text } from 'animejs'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// Heading com reveal caractere a caractere (Anime.js: text.split + stagger).
// Existe para dar uma assinatura de movimento diferente do RevealText
// (box-wipe, usado no Hero/CTA final) e do Reveal padrão (fade-up, usado
// na maioria das seções) — é o que quebra a repetição de entradas.
//
// O texto é renderizado normalmente no HTML e só é dividido depois de
// entrar em viewport: SSR, SEO e leitores de tela recebem a frase
// completa. O TextSplitter se registra no scope ativo do Anime.js e
// desfaz o split no revert, devolvendo o DOM ao estado original.
//
// Motion cuida do "entrou na viewport?" (useInView, já usado no projeto),
// Anime.js cuida da animação em si.
export function AnimeHeading({
  children,
  className,
  as: Tag = 'h2',
}: {
  children: ReactNode
  className?: string
  as?: ElementType
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !inView || !ref.current) return

    const splitter = text.split(ref.current, { chars: true, words: false })
    animate(splitter.chars, {
      opacity: [0, 1],
      y: ['0.5em', '0em'],
      duration: 900,
      delay: stagger(18),
      // Elástico bem amortecido (período alto = um único assentamento
      // suave, não uma sequência de saltos) — overshoot premium, sem o
      // bounce cartunesco do elastic padrão.
      ease: 'outElastic(1, .85)',
    })

    return () => {
      splitter.revert()
    }
  }, [inView, reducedMotion])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
