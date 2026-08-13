'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { EASE_CINEMATIC } from '@/lib/motion'

// children é restrito a ReactNode (nunca MotionValue) porque os fallbacks
// abaixo renderizam um <div> puro, que não aceita MotionValue.
export function MaskReveal({
  children,
  className,
  delay = 0,
  duration = 1,
  once = true,
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [resgatado, setResgatado] = useState(false)

  // Rede de segurança.
  //
  // Este componente esconde a imagem por padrão: o HTML sai do servidor
  // com o clip-path fechado e ela só aparece quando a animação roda. Ou
  // seja, uma foto do site depende de um efeito decorativo para existir,
  // e qualquer falha na cadeia — observer que não dispara, hidratação
  // atrasada, aba voltando do segundo plano com o requestAnimationFrame
  // pausado — deixa a imagem invisível para sempre. Foi o que aconteceu
  // com a foto da seção "A Academia" no celular.
  //
  // A regra certa é: efeito decorativo falha aberto, nunca fechado.
  //
  // Dois cuidados que a primeira tentativa de correção errou:
  //
  // 1. A condição olha se a máscara AINDA ESTÁ FECHADA de fato, lendo o
  //    clip-path calculado — e não se o React já pediu para abrir. Se o
  //    observer dispara mas a animação não roda, pedir para abrir não
  //    abre nada, e um resgate baseado na intenção nunca aconteceria.
  //
  // 2. O resgate devolve um <div> comum, sem animação. Se ele dependesse
  //    do Motion para abrir, dependeria justamente da peça que pode
  //    estar quebrada.
  //
  // Só entra em ação depois que o elemento passou tempo suficiente na
  // tela para a animação ter terminado, então o caminho normal continua
  // intocado: quem está longe da tela guarda o reveal para quando o
  // visitante chegar lá.
  useEffect(() => {
    if (resgatado || reducedMotion) return

    let naTelaDesde: number | null = null

    const conferir = () => {
      const el = ref.current
      if (!el) return

      const r = el.getBoundingClientRect()
      const naTela = r.top < window.innerHeight * 0.9 && r.bottom > 0
      if (!naTela) {
        naTelaDesde = null
        return
      }
      if (naTelaDesde === null) {
        naTelaDesde = Date.now()
        return
      }

      const aindaFechada = getComputedStyle(el).clipPath.includes('100%')
      const jaDeuTempo = Date.now() - naTelaDesde > (delay + duration) * 1000 + 700
      if (aindaFechada && jaDeuTempo) setResgatado(true)
    }

    // getBoundingClientRect e getComputedStyle não dependem de observer
    // nem de requestAnimationFrame — é o que torna esta verificação
    // confiável justamente quando o resto falha. O intervalo se encerra
    // sozinho assim que resgata.
    const id = setInterval(conferir, 500)
    return () => clearInterval(id)
  }, [resgatado, reducedMotion, delay, duration])

  if (reducedMotion || resgatado) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, ease: EASE_CINEMATIC, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
