'use client'

import { useRef } from 'react'
import { Star } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import KineticTestimonial from '@/components/ui/kinetic-testimonials'
import StarBorder from '@/components/ui/star-border'

// 3 avaliações reais do Google (72 avaliações no total, nota 5,0), colhidas
// na página pública de avaliações. Textos abaixo são verbatim (sem
// paráfrase) — cortados em fronteira de frase quando o original era mais
// longo. Sem fotos reais dos avaliadores — "avatar" vazio faz o
// componente cair no fallback de iniciais (não inventamos avatar).
const reviews = [
  {
    name: 'Pedro Alcantara',
    handle: 'Avaliação no Google',
    avatar: '',
    review:
      'A melhor escola de jiu-jitsu de Pirituba e região, grande mestre Marcelo é um exímio professor de jiu-jitsu, ensina eu e meu filho todos os dias a arte suave.',
  },
  {
    name: 'Júlia Bertin',
    handle: 'Avaliação no Google',
    avatar: '',
    review:
      'Adoro treinar na Gracie Barra Pirituba! O ambiente é incrível, acolhedor e motivador. Os professores são excelentes, principalmente o Marcelo e a Lili.',
  },
  {
    name: 'Ana Júlia Souza',
    handle: 'Avaliação no Google',
    avatar: '',
    review:
      'A Gracie Barra Pirituba tem um ambiente muito acolhedor, os professores são muito atenciosos, os treinos são ótimos ajudam na evolução pessoal de cada um, super recomendo essa academia.',
  },
]

export function TestimonialsReview() {
  const badgeRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reducedMotion || !counterRef.current || !badgeRef.current) return
      const value = { current: 0 }
      const stars = gsap.utils.toArray<HTMLElement>('.review-star', badgeRef.current)
      gsap.set(stars, { scale: 0, opacity: 0 })

      ScrollTrigger.create({
        trigger: badgeRef.current,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(stars, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: 'back.out(3)',
          })
          gsap.to(value, {
            current: 5,
            duration: 1.2,
            delay: 0.2,
            ease: 'power2.out',
            onUpdate: () => {
              if (counterRef.current) counterRef.current.textContent = value.current.toFixed(1)
            },
          })
        },
      })
    },
    { scope: badgeRef, dependencies: [reducedMotion] },
  )

  return (
    <div>
      {/* Star Border (React Bits, adaptado): um brilho da cor da marca
          percorre a borda do selo. É o único elemento da página com esse
          tratamento — destaca a prova social sem virar vitrine. */}
      <div className="flex justify-center">
        <StarBorder
          speed="7s"
          contentClassName="px-10 py-6"
          className="w-full max-w-xs"
        >
          <div
            ref={badgeRef}
            className="flex flex-col items-center justify-center gap-2 text-center"
            aria-label="Avaliação 5.0 de 5 estrelas, 72 avaliações no Google"
          >
            <div className="flex gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="review-star size-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="font-display text-3xl font-bold text-primary">
              <span ref={counterRef}>{reducedMotion ? '5.0' : '0.0'}</span>
            </p>
            <p className="text-sm text-muted-foreground">72 avaliações no Google</p>
          </div>
        </StarBorder>
      </div>

      {/* Kinetic Testimonials (ScrollX UI): colunas de reviews rolando em
          marquee vertical, com destaque de gradiente da marca no hover.
          Poucas colunas de propósito — só temos 3 avaliações reais
          colhidas, não temos por que simular uma comunidade enorme. */}
      <KineticTestimonial
        testimonials={reviews}
        desktopColumns={3}
        tabletColumns={2}
        mobileColumns={1}
        speed={0.7}
        cardClassName="bg-card"
      />
    </div>
  )
}
