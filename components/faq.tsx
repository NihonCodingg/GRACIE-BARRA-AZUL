'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { animate } from 'animejs'
import { Plus } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { CtaButton } from '@/components/cta-button'
import { WhatsAppIcon } from '@/components/icons'
import { RevealGroup, RevealItem } from '@/components/motion/reveal-group'
import { Magnetic } from '@/components/motion/magnetic'
import StaggerChars from '@/components/ui/stagger-chars'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { whatsappLink, site } from '@/lib/site'
import { cn } from '@/lib/utils'

// Só perguntas cujas respostas estão confirmadas pela academia. As que
// dependiam de política interna ainda não confirmada (kimono, idade
// mínima, como funciona a primeira aula) foram removidas em vez de
// ficarem como placeholder no ar.
const faqs: { q: string; a: ReactNode }[] = [
  {
    q: 'Preciso ter experiência para começar?',
    a: 'Não. As turmas recebem alunos de todos os níveis, e os fundamentos são ensinados desde o começo — você evolui no seu ritmo, acompanhado pelos instrutores.',
  },
  {
    q: 'Quais são os horários das aulas?',
    a: 'Confira a grade completa de turmas, por dia e nível, na seção Horários acima. Funcionamos de segunda a sexta, das 7h às 21h, e aos sábados, das 10h às 12h30.',
  },
  {
    q: 'Existe aula experimental?',
    a: (
      <>
        Sim. Fale com a gente pelo{' '}
        <a
          href={whatsappLink('Olá! Gostaria de agendar uma aula experimental na Gracie Barra Pirituba.')}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary underline underline-offset-4 transition-colors hover:text-foreground"
        >
          WhatsApp
        </a>{' '}
        e marque a sua já.
      </>
    ),
  },
  {
    q: 'Onde fica a academia?',
    a: `Estamos em ${site.addressLine}.`,
  },
]

// Ícone +/× do accordion (Anime.js): a rotação ganha um overshoot
// elástico curto no lugar do transition CSS linear. Só o ícone muda — a
// lógica de abrir/fechar e a transição de altura continuam exatamente
// como estavam.
function FaqIcon({ isOpen }: { isOpen: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()
  const hasMounted = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // No primeiro render (e com reduced motion) o ícone só assume a
    // posição final: sem isso o item aberto por padrão animaria sozinho
    // assim que a página carrega.
    if (!hasMounted.current || reducedMotion) {
      hasMounted.current = true
      el.style.transform = isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
      return
    }

    animate(el, {
      rotate: isOpen ? 45 : 0,
      duration: 700,
      ease: 'outElastic(1, .6)',
    })
  }, [isOpen, reducedMotion])

  return (
    <span ref={ref} className="inline-flex shrink-0 will-change-transform">
      <Plus className="size-5 text-primary" />
    </span>
  )
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="border-t border-border bg-card/40 py-20 max-sm:py-14 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Ainda tem alguma dúvida?" align="center" />

        <RevealGroup
          stagger={0.05}
          className="mt-12 divide-y divide-border overflow-hidden rounded-sm border border-border bg-card"
        >
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <RevealItem key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  {/* Stagger Chars (ScrollX UI): mesma assinatura de hover
                      dos links de navegação e dos cards de perfil. */}
                  <span className="font-display text-base font-semibold uppercase tracking-wide">
                    <StaggerChars
                      text={item.q}
                      duration={0.4}
                      delay={0.008}
                      className="text-inherit"
                    />
                  </span>
                  <FaqIcon isOpen={isOpen} />
                </button>
                <div
                  className={cn(
                    'grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {item.a}
                    </p>
                  </div>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">Ainda ficou com alguma dúvida?</p>
          <Magnetic className="inline-block">
            <CtaButton href={whatsappLink('Olá! Fiquei com uma dúvida sobre as aulas da Gracie Barra Pirituba.')}>
              <WhatsAppIcon className="size-4" />
              Falar conosco pelo WhatsApp
            </CtaButton>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
