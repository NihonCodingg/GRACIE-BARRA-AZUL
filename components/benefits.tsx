import { Shield, Flame, TrendingUp, Target, Users, ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { CtaButton } from '@/components/cta-button'
import { RevealGroup, RevealItem } from '@/components/motion/reveal-group'
import { Magnetic } from '@/components/motion/magnetic'
import { AnimeIconPop } from '@/components/motion/anime-icon-pop'
import { CardTilt, CardTiltContent } from '@/components/ui/card-tilt'
import { SpotlightCard } from '@/components/ui/spotlightcard'
import GlowingBorderCard from '@/components/ui/glowingbordercard'
import Typeanimation from '@/components/ui/typeanimation'
import { whatsappLink } from '@/lib/site'

const benefits = [
  {
    icon: Shield,
    title: 'Disciplina',
    text: 'Construa consistência e aprenda a superar desafios dentro e fora do tatame.',
  },
  {
    icon: Flame,
    title: 'Condicionamento',
    text: 'Treine seu corpo, desenvolva resistência e transforme movimento em evolução.',
  },
  {
    icon: TrendingUp,
    title: 'Autoconfiança',
    text: 'Evolua tecnicamente e enfrente novos desafios com mais segurança.',
  },
  {
    icon: Target,
    title: 'Técnica',
    text: 'Aprenda fundamentos, movimentos e estratégias que fazem parte da jornada no Jiu-Jitsu.',
  },
  {
    icon: Users,
    title: 'Comunidade',
    text: 'Treine ao lado de pessoas que compartilham o mesmo objetivo: evoluir.',
  },
]

// O SpotlightCard (ScrollX UI) monta um rgba(${cor}, 0.15), então a cor
// precisa chegar como componentes "R, G, B". Passando a var do tema, a
// substituição acontece antes do parse do rgba() e o brilho acompanha a
// versão: vermelho na V1, azul na V2. Ver --decor-rgb em globals.css.
const SPOTLIGHT_COLOR = 'var(--decor-rgb)'

export function Benefits() {
  return (
    <section id="jiu-jitsu" className="border-t border-border bg-card/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Jiu-Jitsu"
          title="Evolução dentro e fora do tatame."
          description="O Jiu-Jitsu vai muito além do treino. É uma prática que desafia seu corpo, desenvolve sua mente e ensina você a lidar com desafios de forma constante."
        />

        <p className="mt-4 font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Você vai treinar{' '}
          <Typeanimation
            words={['Disciplina', 'Condicionamento', 'Autoconfiança', 'Técnica', 'Comunidade']}
            gradientClassName="from-primary to-primary"
            className="font-bold"
            pauseDuration={1400}
          />
        </p>

        <RevealGroup stagger={0.08} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <RevealItem key={b.title}>
              {/* Card Tilt (ScrollX UI): inclinação 3D real via contexto
                  rotateX/rotateY. Spotlight Card (ScrollX UI): brilho
                  radial da cor da marca seguindo o cursor. AnimeIconPop
                  (Anime.js): o ícone dá um "pop" quando o card recebe
                  hover. */}
              <AnimeIconPop>
                <CardTilt tiltMaxAngle={10} scale={1.02} className="block h-full w-full">
                  <CardTiltContent className="h-full">
                    <SpotlightCard
                      spotlightColor={SPOTLIGHT_COLOR}
                      className="h-full"
                      contentClassName="items-start justify-start text-left"
                    >
                      <span
                        data-anime-pop
                        className="mb-6 flex size-12 items-center justify-center rounded-sm bg-primary/10 text-primary will-change-transform"
                      >
                        <b.icon className="size-6" />
                      </span>
                      <h3 className="font-display text-xl font-bold uppercase tracking-wide">
                        {b.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {b.text}
                      </p>
                    </SpotlightCard>
                  </CardTiltContent>
                </CardTilt>
              </AnimeIconPop>
            </RevealItem>
          ))}

          <RevealItem>
            <GlowingBorderCard
              gradientClassName="from-primary to-primary/30"
              className="h-full"
              contentClassName="flex-col items-start justify-center gap-4 p-8 text-left"
            >
              <p className="font-display text-2xl font-bold uppercase leading-tight text-balance">
                Pronto para dar o primeiro passo?
              </p>
              <Magnetic className="inline-block">
                <CtaButton href={whatsappLink('Olá! Quero começar a treinar Jiu-Jitsu na Gracie Barra Pirituba.')}>
                  Quero começar
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </CtaButton>
              </Magnetic>
            </GlowingBorderCard>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}
