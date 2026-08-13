import { MapPin, Navigation } from 'lucide-react'
import { CtaButton } from '@/components/cta-button'
import { WhatsAppIcon } from '@/components/icons'
import { RevealGroup, RevealItem } from '@/components/motion/reveal-group'
import { MaskReveal } from '@/components/motion/mask-reveal'
import { Magnetic } from '@/components/motion/magnetic'
import StaggerChars from '@/components/ui/stagger-chars'
import { site, whatsappLink } from '@/lib/site'

export function Location() {
  const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`
  const mapsDir = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapsQuery)}`

  return (
    <section id="localizacao" className="border-t border-border py-20 max-sm:py-14 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <RevealGroup stagger={0.1}>
          <RevealItem className="mb-4 inline-flex items-center gap-2 border-l-2 border-primary pl-3">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <StaggerChars text="Localização" duration={0.4} delay={0.02} className="text-inherit" />
            </span>
          </RevealItem>
          <RevealItem>
            <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Seu próximo treino está mais perto do que você imagina.
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Estamos em Pirituba, São Paulo.
            </p>
          </RevealItem>

          <RevealItem className="mt-6 flex items-start gap-3 rounded-sm border border-border bg-card p-5">
            <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="font-display font-semibold uppercase tracking-wide">{site.name}</p>
              <p className="text-sm text-muted-foreground">{site.addressLine}</p>
            </div>
          </RevealItem>

          <RevealItem className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Magnetic className="inline-block">
              <CtaButton href={mapsDir}>
                <Navigation className="size-4" />
                Como chegar
              </CtaButton>
            </Magnetic>
            <Magnetic className="inline-block">
              <CtaButton
                variant="outline"
                href={whatsappLink('Olá! Gostaria de saber como chegar na Gracie Barra Pirituba.')}
              >
                <WhatsAppIcon className="size-4" />
                Falar no WhatsApp
              </CtaButton>
            </Magnetic>
          </RevealItem>
        </RevealGroup>

        <MaskReveal delay={0.1} className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border">
          <iframe
            title="Mapa da localização da Gracie Barra Pirituba"
            src={mapsEmbed}
            className="h-full w-full grayscale-[0.3]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </MaskReveal>
      </div>
    </section>
  )
}
