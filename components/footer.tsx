import Image from 'next/image'
import { MapPin, Clock } from 'lucide-react'
import { WhatsAppIcon, InstagramIcon } from '@/components/icons'
import StaggerChars from '@/components/ui/stagger-chars'
import { navLinks, site, whatsappLink } from '@/lib/site'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="" width={40} height={40} className="size-9" />
              <span className="font-display text-sm font-semibold uppercase leading-tight tracking-wide">
                Gracie Barra
                <span className="block text-xs font-normal text-muted-foreground">Pirituba</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Jiu-Jitsu em Pirituba, São Paulo.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">
              <StaggerChars text="Navegação" duration={0.4} delay={0.02} className="text-inherit" />
            </h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {/* Mesmo Stagger Chars (ScrollX UI) do menu do topo:
                      os links de navegação do site inteiro compartilham
                      a mesma assinatura de hover. */}
                  {/* No celular o link vira um alvo de toque de 44px de
                      altura — o mínimo recomendado, e o dobro dos 22px
                      que a linha de texto tinha sozinha. No desktop o
                      alvo é o ponteiro do mouse, então nada muda. */}
                  <a
                    href={link.href}
                    className="inline-block text-sm text-muted-foreground transition-colors hover:text-primary max-sm:flex max-sm:min-h-11 max-sm:items-center"
                  >
                    <StaggerChars
                      text={link.label}
                      duration={0.4}
                      delay={0.02}
                      className="text-inherit normal-case"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">
              <StaggerChars text="Contato" duration={0.4} delay={0.02} className="text-inherit" />
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={whatsappLink('Olá! Gostaria de agendar uma aula na Gracie Barra Pirituba.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-primary max-sm:min-h-11"
                >
                  <WhatsAppIcon className="size-4 transition-transform duration-300 group-hover:scale-110" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-primary max-sm:min-h-11"
                >
                  <InstagramIcon className="size-4 transition-transform duration-300 group-hover:scale-110" />@{site.instagramHandle}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                {site.addressLine}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">
              <StaggerChars text="Horários" duration={0.4} delay={0.02} className="text-inherit" />
            </h3>
            {/* Horário de funcionamento oficial confirmado na ficha do Google Business. */}
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4 text-primary" />
              Seg. a sex.: 07h–21h · Sáb.: 10h–12h30
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Gracie Barra Pirituba. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground">Jiu-Jitsu · Disciplina · Evolução</p>
        </div>
      </div>
    </footer>
  )
}
