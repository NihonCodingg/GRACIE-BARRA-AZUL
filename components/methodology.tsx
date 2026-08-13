import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { CtaButton } from '@/components/cta-button'
import { Reveal } from '@/components/motion/reveal'
import { RevealGroup, RevealItem } from '@/components/motion/reveal-group'
import { TracingBeam } from '@/components/motion/tracing-beam'
import { Lens } from '@/components/motion/lens'
import { Magnetic } from '@/components/motion/magnetic'
import { MotionGrid } from '@/components/ui/motion-grid'
import StaggerChars from '@/components/ui/stagger-chars'
import { instagramDmLink } from '@/lib/site'

const steps = [
  { title: 'Técnica', text: 'Fundamentos e movimentos ensinados de forma clara e progressiva.' },
  { title: 'Progressão', text: 'Cada treino é construído sobre o anterior, respeitando o seu ritmo.' },
  { title: 'Disciplina', text: 'Consistência e foco como base para a evolução no tatame.' },
  { title: 'Acompanhamento', text: 'Instrutores acompanham seu desenvolvimento em cada etapa.' },
]

export function Methodology() {
  return (
    <section id="metodologia" className="relative overflow-hidden border-t border-border py-20 max-sm:py-14 lg:py-28">
      {/* Motion Grid (ScrollX UI): textura de fundo sutil, recolorida pra
          vermelho da marca em baixíssima opacidade — só uma vibração de
          fundo, não um elemento que compete com o conteúdo. */}
      <MotionGrid
        className="absolute inset-0 -z-10"
        opacity={0.06}
        speed="45s"
        gridSpacing="28px"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <div className="mb-4 inline-flex items-center gap-2 border-l-2 border-primary pl-3">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <StaggerChars text="Metodologia" duration={0.4} delay={0.02} className="text-inherit" />
            </span>
          </div>
          <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Aprenda. Treine. Evolua.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground text-pretty">
            Evoluir no Jiu-Jitsu é um processo. Cada treino é uma oportunidade para
            aprender novas técnicas, colocar seus conhecimentos em prática e desenvolver
            suas habilidades progressivamente. A jornada é construída com técnica,
            disciplina, consistência e dedicação.
          </p>

          <TracingBeam className="mt-8 pl-6">
            <RevealGroup stagger={0.08} className="divide-y divide-border border-y border-border">
              {steps.map((s) => (
                <RevealItem key={s.title} className="flex items-baseline gap-4 py-4">
                  <span className="font-display text-sm font-semibold uppercase tracking-widest text-primary">
                    {s.title}
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{s.text}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </TracingBeam>

          <div className="mt-8">
            <Magnetic className="inline-block">
              <CtaButton variant="outline" href={instagramDmLink()}>
                Conhecer as aulas
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </CtaButton>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative aspect-square overflow-hidden rounded-sm">
          <Lens src="/images/graduacao.png" className="h-full w-full">
            <Image
              src="/images/graduacao.png"
              alt="Mestre Marcelo entregando o certificado de faixa azul a um aluno da Gracie Barra Pirituba"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Lens>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </Reveal>
      </div>
    </section>
  )
}
