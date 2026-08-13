import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { CtaButton } from '@/components/cta-button'
import { MaskReveal } from '@/components/motion/mask-reveal'
import { Lens } from '@/components/motion/lens'
import { RevealGroup, RevealItem } from '@/components/motion/reveal-group'
import { AnimeHeading } from '@/components/motion/anime-heading'
import { Magnetic } from '@/components/motion/magnetic'
import StaggerChars from '@/components/ui/stagger-chars'
import { instagramDmLink } from '@/lib/site'

export function About() {
  return (
    <section id="academia" className="border-t border-border py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <MaskReveal className="relative aspect-[4/5] overflow-hidden rounded-sm lg:aspect-[4/5]">
          <Lens src="/images/academy.jpg" className="h-full w-full">
            <Image
              src="/images/academy.jpg"
              alt="Recepção da Gracie Barra Pirituba"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Lens>
          <div className="pointer-events-none absolute bottom-0 left-0 border-t border-r border-primary bg-background/90 px-5 py-3 backdrop-blur">
            <span className="font-display text-sm font-semibold uppercase tracking-widest text-primary">
              Gracie Barra Pirituba
            </span>
          </div>
        </MaskReveal>

        <RevealGroup stagger={0.12}>
          <RevealItem className="mb-4 inline-flex items-center gap-2 border-l-2 border-primary pl-3">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <StaggerChars text="A Academia" duration={0.4} delay={0.02} className="text-inherit" />
            </span>
          </RevealItem>
          {/* Fora do RevealItem de propósito: aqui o reveal é caractere a
              caractere (Anime.js), não o fade-up do grupo. */}
          <AnimeHeading className="font-display text-3xl font-bold uppercase leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Mais do que um treino.
          </AnimeHeading>
          <RevealItem>
            <p className="mt-6 text-lg font-medium leading-relaxed text-foreground text-pretty">
              O Jiu-Jitsu é uma jornada de aprendizado, disciplina e evolução.
            </p>
          </RevealItem>
          <RevealItem>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
              Na Gracie Barra Pirituba, você encontra um ambiente dedicado ao
              desenvolvimento técnico e pessoal, onde cada treino é uma oportunidade
              para aprender, superar desafios e evoluir.
            </p>
          </RevealItem>
          <RevealItem className="mt-8">
            <Magnetic className="inline-block">
              <CtaButton variant="outline" href={instagramDmLink()}>
                Conhecer a Gracie Barra Pirituba
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </CtaButton>
            </Magnetic>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}
