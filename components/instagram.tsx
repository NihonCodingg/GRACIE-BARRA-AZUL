import { SectionHeading } from '@/components/section-heading'
import { CtaButton } from '@/components/cta-button'
import { InstagramIcon } from '@/components/icons'
import { AnimeGridReveal } from '@/components/motion/anime-grid-reveal'
import { ParallaxImage } from '@/components/motion/parallax-image'
import { Magnetic } from '@/components/motion/magnetic'
import { site } from '@/lib/site'

// Força de parallax alternada por tile — cria sensação de profundidade no
// feed em vez de um grid plano parado (referência: Aceternity "3D Marquee").
// Nota: testamos o Cursor ImageTrail real do ScrollX UI aqui, mas o
// resultado ficou uma pilha de fotos embolada sobre o texto do heading —
// revertido para este grid com profundidade, mais limpo e legível.
const feed = [
  { src: '/images/train-1.jpg', strength: 10 },
  { src: '/images/instagram-1.webp', strength: 20 },
  { src: '/images/train-3.webp', strength: 12 },
  { src: '/images/facility-1.jpg', strength: 18 },
  { src: '/images/train-2.jpg', strength: 10 },
  { src: '/images/academy.jpg', strength: 22 },
]

export function Instagram() {
  return (
    <section id="instagram" className="border-t border-border bg-card/40 py-20 max-sm:py-14 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Instagram"
          title="A vida no tatame continua todos os dias."
          description="Treinos, alunos, eventos, graduações e momentos que fazem parte da nossa comunidade."
        />
        <p className="mt-3 font-display text-lg font-semibold text-primary">@{site.instagramHandle}</p>

        {/* Entrada em diagonal (Anime.js) no lugar do fade-up padrão —
            dá assinatura própria a esta seção. */}
        <AnimeGridReveal className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {feed.map((item, i) => (
            <div key={i} data-anime-grid-item className="will-change-transform">
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="image"
                className="group relative block aspect-square overflow-hidden rounded-sm"
                aria-label="Ver publicação no Instagram"
              >
                <ParallaxImage
                  src={item.src}
                  alt="Momento de treino na Gracie Barra Pirituba"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  strength={item.strength}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-primary/0 transition-colors group-hover:bg-primary/60">
                  <InstagramIcon className="size-7 text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </a>
            </div>
          ))}
        </AnimeGridReveal>

        <div className="mt-10">
          <Magnetic className="inline-block">
            <CtaButton href={site.instagramUrl}>
              <InstagramIcon className="size-4" />
              Seguir no Instagram
            </CtaButton>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
