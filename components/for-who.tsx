import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { CtaButton } from '@/components/cta-button'
import { RevealGroup, RevealItem } from '@/components/motion/reveal-group'
import { Reveal } from '@/components/motion/reveal'
import { ExpandableCard } from '@/components/motion/expandable-card'
import { Magnetic } from '@/components/motion/magnetic'
import StaggerChars from '@/components/ui/stagger-chars'
import { whatsappLink } from '@/lib/site'

const blocks = [
  {
    title: 'Nunca treinou?',
    text: 'Você não precisa ter experiência para dar o primeiro passo. Comece sua jornada aprendendo desde os fundamentos.',
  },
  {
    title: 'Já pratica Jiu-Jitsu?',
    text: 'Continue desenvolvendo sua técnica e evoluindo em um ambiente dedicado ao Jiu-Jitsu.',
  },
  {
    title: 'Busca condicionamento?',
    text: 'Transforme o treino em uma rotina que desafia seu corpo e ajuda você a evoluir.',
  },
  {
    title: 'Quer desenvolver disciplina?',
    text: 'O Jiu-Jitsu pode fazer parte de uma rotina que valoriza consistência, foco e evolução.',
  },
]

export function ForWho() {
  return (
    <section className="border-t border-border py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Para quem é"
          title="Existe um lugar para você no tatame."
          description="Toque no seu perfil e veja por onde começar."
        />

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2">
          {blocks.map((b, i) => (
            <RevealItem key={b.title}>
              <ExpandableCard
                defaultOpen={i === 0}
                header={
                  <div className="flex items-center gap-5">
                    <span className="h-8 w-1 shrink-0 bg-primary" aria-hidden="true" />
                    {/* Stagger Chars (ScrollX UI): mesma assinatura de
                        hover dos links de navegação, aplicada a outro
                        texto clicável em tipografia display. */}
                    <h3 className="font-display text-lg font-bold uppercase tracking-wide">
                      <StaggerChars
                        text={b.title}
                        duration={0.4}
                        delay={0.015}
                        className="text-inherit"
                      />
                    </h3>
                  </div>
                }
              >
                <p className="pl-[calc(0.25rem+1.25rem)] text-sm leading-relaxed text-muted-foreground">
                  {b.text}
                </p>
              </ExpandableCard>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Treino Feminino: turma real confirmada na grade de horários
            (GBF, terças e quintas às 19h). A peça promocional já tem
            texto embutido — por isso vai inteira, sem corte nem overlay
            de texto por cima, com o apoio textual ao lado em vez de
            sobreposto. */}
        <div className="mt-4 grid items-center gap-8 rounded-sm border border-border bg-card p-6 sm:p-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-12">
          <Reveal className="relative mx-auto aspect-[736/780] w-full max-w-[280px] overflow-hidden rounded-sm">
            <Image
              src="/images/treino-feminino.jpg"
              alt="Divulgação do treino especial feminino da Gracie Barra Pirituba"
              fill
              sizes="(max-width: 1024px) 60vw, 280px"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="inline-flex items-center gap-2 border-l-2 border-primary pl-3">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                Treino Feminino
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold uppercase leading-tight tracking-wide text-balance sm:text-3xl">
              Jiu-Jitsu e defesa pessoal, num espaço só para elas.
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Turma feminina (GBF) às terças e quintas, 19h — confira os outros horários na seção Turmas e Horários.
            </p>
            <div className="mt-5">
              <Magnetic className="inline-block">
                <CtaButton
                  variant="outline"
                  href={whatsappLink('Olá! Gostaria de saber mais sobre o treino feminino da Gracie Barra Pirituba.')}
                >
                  Saber mais
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </CtaButton>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <div className="mt-10">
          <Magnetic className="inline-block">
            <CtaButton href={whatsappLink('Olá! Quero descobrir qual a melhor turma para o meu perfil.')}>
              Descobrir a melhor turma
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </CtaButton>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
