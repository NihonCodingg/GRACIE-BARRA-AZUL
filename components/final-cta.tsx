import { CtaButton } from '@/components/cta-button'
import { WhatsAppIcon } from '@/components/icons'
import { ParallaxImage } from '@/components/motion/parallax-image'
import { RevealGroup, RevealItem } from '@/components/motion/reveal-group'
import { RevealText } from '@/components/ui/reveal-text'
import WavyButton from '@/components/ui/wavy-button'
import StaggerChars from '@/components/ui/stagger-chars'
import { Magnetic } from '@/components/motion/magnetic'
import { whatsappLink, instagramDmLink } from '@/lib/site'

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-border">
      <ParallaxImage src="/images/facility-2.jpg" alt="" sizes="100vw" strength={14} />
      <div className="absolute inset-0 bg-background/85" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/50" />

      <RevealGroup stagger={0.1} className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:py-32 lg:px-8">
        <RevealItem>
          <span className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            <StaggerChars text="Comece agora" duration={0.4} delay={0.02} className="text-inherit" />
          </span>
        </RevealItem>
        <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-balance sm:text-5xl lg:text-6xl">
          <RevealText mode="auto" direction="up" stagger={0.06} duration={0.6} boxClassName="bg-primary">
            Seu primeiro passo começa aqui.
          </RevealText>
        </h2>
        <RevealItem>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Descubra o Jiu-Jitsu e conheça a Gracie Barra Pirituba.
          </p>
        </RevealItem>
        <RevealItem className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Magnetic className="inline-block">
            <CtaButton
              size="lg"
              href={whatsappLink('Olá! Gostaria de agendar uma aula na Gracie Barra Pirituba.')}
            >
              <WhatsAppIcon className="size-5" />
              Agendar uma aula
            </CtaButton>
          </Magnetic>
          {/* Wavy Button (ScrollX UI): traço SVG desenha a borda e as
              letras ondulam no hover. Reservado pra este momento — o
              maior instante de conversão da página. */}
          <WavyButton
            asChild
            variant="outline"
            radius="sm"
            className="h-14 px-8 text-base font-display uppercase tracking-wide"
          >
            <a href={instagramDmLink()} target="_blank" rel="noopener noreferrer">
              Chamar no Instagram
            </a>
          </WavyButton>
        </RevealItem>
      </RevealGroup>
    </section>
  )
}
