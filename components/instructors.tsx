import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { CtaButton } from '@/components/cta-button'
import { MaskReveal } from '@/components/motion/mask-reveal'
import { Lens } from '@/components/motion/lens'
import { RevealGroup, RevealItem } from '@/components/motion/reveal-group'
import { Magnetic } from '@/components/motion/magnetic'
import StaggerChars from '@/components/ui/stagger-chars'
import { whatsappLink } from '@/lib/site'

// Marcelo Porfirio: dados públicos confirmados via Instagram (@porfsgb) e
// avaliações reais da academia, foto real confirmada pelo cliente. Não
// inventar graduação/experiência além destes 4 fatos confirmados.
//
// Uma avaliação real no Google (Júlia Bertin) menciona uma professora
// "Lili" ao lado do Marcelo — só o primeiro nome, sem sobrenome, graduação
// ou foto confirmados. Adicionar um segundo card quando esses dados forem
// confirmados com a academia (não há segundo professor confirmado hoje).
const instructor = {
  name: 'Marcelo Porfirio',
  rank: 'Head Coach · Faixa Preta',
  bio: 'Faixa preta em Judô desde 1995 e faixa preta em Jiu-Jitsu, Marcelo é o Head Coach da Gracie Barra Pirituba. Fora do tatame, é maratonista de 42K.',
  image: '/images/professor.png',
}

export function Instructors() {
  return (
    <section className="border-t border-border bg-card/40 py-20 max-sm:py-14 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Professor"
          title="Quem vai acompanhar sua evolução?"
          description="Conheça quem vai orientar sua jornada no tatame."
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* A foto é 4:3 (1200x896) — o container acompanha a proporção
              original para não cortar o Mestre nem os alunos ao fundo. */}
          <MaskReveal duration={1.1} className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Lens src={instructor.image} className="h-full w-full">
              <Image
                src={instructor.image}
                alt={`${instructor.name}, ${instructor.rank} da Gracie Barra Pirituba`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </Lens>
          </MaskReveal>

          <RevealGroup stagger={0.1} delayChildren={0.2}>
            <RevealItem>
              <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <StaggerChars
                  text={instructor.rank}
                  duration={0.4}
                  delay={0.02}
                  className="text-inherit"
                />
              </span>
            </RevealItem>
            <RevealItem>
              <h3 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
                <StaggerChars
                  text={instructor.name}
                  duration={0.45}
                  delay={0.025}
                  className="text-inherit"
                />
              </h3>
            </RevealItem>
            <RevealItem>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                {instructor.bio}
              </p>
            </RevealItem>
            <RevealItem className="mt-8">
              <Magnetic className="inline-block">
                <CtaButton
                  variant="outline"
                  href={whatsappLink('Olá! Gostaria de treinar com o Marcelo na Gracie Barra Pirituba.')}
                >
                  Treinar com o Marcelo
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </CtaButton>
              </Magnetic>
            </RevealItem>
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
