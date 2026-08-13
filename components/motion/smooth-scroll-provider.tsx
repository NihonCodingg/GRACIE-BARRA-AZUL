'use client'

import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// Envolve só {children} dentro do <body> em app/layout.tsx — nunca <html>/
// <body> inteiro, para não converter a árvore inteira em Client Component.
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion()
  // Em modo `root`, o Lenis publica a instância num store global (fora da
  // árvore de contexto), então useLenis() aqui já reflete a instância
  // criada pelo <ReactLenis root> abaixo, mesmo antes do primeiro filho
  // renderizar — sem depender de timing de ref.
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    // Capturado numa const após o guard: a closure de `update` abaixo
    // precisa de um tipo já estreitado para `Lenis` (não `Lenis | undefined`).
    const activeLenis = lenis

    // Integração oficial Lenis + ScrollTrigger: o gsap.ticker dirige o RAF
    // do Lenis (autoRaf: false abaixo) e o Lenis avisa o ScrollTrigger a
    // cada frame — evita dois loops de requestAnimationFrame concorrentes.
    function update(time: number) {
      activeLenis.raf(time * 1000)
    }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    activeLenis.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(update)
      activeLenis.off('scroll', ScrollTrigger.update)
    }
  }, [lenis])

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        // Reduced motion não desmonta o Lenis (evitaria mismatch de
        // hidratação client/server) — só remove a suavização: lerp 1 =
        // sem interpolação, o scroll passa a ser essencialmente nativo.
        lerp: reducedMotion ? 1 : 0.1,
        smoothWheel: !reducedMotion,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
