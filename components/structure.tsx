import Image from 'next/image'
import { SectionHeading } from '@/components/section-heading'
import { CtaButton } from '@/components/cta-button'
import { InstagramIcon } from '@/components/icons'
import { Magnetic } from '@/components/motion/magnetic'
import ParallaxCards from '@/components/ui/parallaxcards'
import { site } from '@/lib/site'

// Os cards são widescreen (62vh de altura, largura total), então fotos em
// retrato precisam ser ancoradas no topo — com o padrão `center` o corte
// come as cabeças e sobra só tronco. `objectPosition` é definido por foto
// conforme o formato original de cada uma.
const facilities = [
  { src: '/images/facility-1.jpg', label: 'Tatame', objectPosition: 'object-[50%_35%]' },
  { src: '/images/facility-2.jpg', label: 'Comunidade', objectPosition: 'object-center' },
  { src: '/images/facility-3.jpg', label: 'Fachada', objectPosition: 'object-center' },
  { src: '/images/train-2.jpg', label: 'Detalhes', objectPosition: 'object-center' },
  { src: '/images/alunos.webp', label: 'Alunos', objectPosition: 'object-center' },
]

export function Structure() {
  return (
    <section className="border-t border-border py-20 lg:pb-0 lg:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Estrutura"
          title="Um espaço para você evoluir."
          description="Um ambiente preparado para treinar, aprender e compartilhar a jornada do Jiu-Jitsu. Role para conhecer cada canto."
        />
      </div>

      {/* Parallax Cards (ScrollX UI): pilha de fotos que gruda no topo e
          empilha conforme o scroll — a seção-showcase da estrutura. */}
      <ParallaxCards
        className="mt-14"
        cardHeight="62vh"
        cards={facilities.map((f) => ({
          cardClassName: 'bg-background',
          content: (
            <div className="relative h-full w-full" data-cursor="image">
              <Image
                src={f.src}
                alt={`${f.label} da Gracie Barra Pirituba`}
                fill
                sizes="100vw"
                className={`object-cover ${f.objectPosition}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
                <span className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
                  {f.label}
                </span>
              </div>
            </div>
          ),
        }))}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Magnetic className="inline-block">
          <CtaButton variant="outline" href={site.instagramUrl}>
            <InstagramIcon className="size-4" />
            Ver mais no Instagram
          </CtaButton>
        </Magnetic>
      </div>
    </section>
  )
}
