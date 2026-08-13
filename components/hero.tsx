'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { useGSAP } from '@gsap/react'
import { MapPin, ArrowRight } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { CtaButton } from '@/components/cta-button'
import { WhatsAppIcon } from '@/components/icons'
import { ParallaxImage } from '@/components/motion/parallax-image'
import { HeroVideo } from '@/components/motion/hero-video'
import { Magnetic } from '@/components/motion/magnetic'
import { ScrollIndicator } from '@/components/motion/scroll-indicator'
import { RevealText } from '@/components/ui/reveal-text'
import StaggerChars from '@/components/ui/stagger-chars'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { whatsappLink, site } from '@/lib/site'

// Entrada cinematográfica: primeira coisa que o visitante vê. Anima no
// mount (Motion, initial/animate) e reage à saída de scroll (GSAP scrub).
// É a única seção que vira Client Component inteira, sem fetch de dados a
// preservar.
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const initial = reducedMotion ? 'show' : 'hidden'

  // Entrada (scale 1.12 → 1.0) e saída (scale 1.0 → 1.08 no scroll) da
  // imagem de fundo ficam no mesmo motor (GSAP), controlando o mesmo
  // elemento — nunca dividido com Motion, pra não haver disputa de
  // transform entre os dois motores de animação no mesmo nó.
  useGSAP(
    () => {
      if (!sectionRef.current || !imageWrapRef.current) return

      if (reducedMotion) {
        gsap.set(imageWrapRef.current, { scale: 1 })
        return
      }

      gsap.fromTo(
        imageWrapRef.current,
        { scale: 1.12 },
        { scale: 1, duration: 1.4, ease: 'power2.out' },
      )

      const tween = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      if (contentRef.current) {
        tween.to(contentRef.current, { scale: 0.94, opacity: 0.35, ease: 'none' }, 0)
      }
      tween.to(imageWrapRef.current, { scale: 1.08, ease: 'none' }, 0)

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  )

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
    >
      <motion.div
        initial={reducedMotion ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        {/* Camada separada da entrada (Motion, acima) para a saída no
            scroll (GSAP, abaixo) nunca disputarem a mesma propriedade do
            mesmo elemento. */}
        <div ref={imageWrapRef} className="absolute inset-0">
          <ParallaxImage
            src="/images/hero.jpg"
            alt="Equipe da Gracie Barra Pirituba celebrando uma conquista em competição"
            preload
            sizes="100vw"
            strength={12}
          />
          {/* Teste visual: na V2 o vídeo entra por cima da imagem depois
              de carregar. Na V1 não renderiza nada. Ver hero-video.tsx. */}
          <HeroVideo />
        </div>
      </motion.div>
      {/* Escurecimento do desktop: horizontal, porque lá o texto ocupa
          só a metade esquerda e a direita fica livre para a foto e para
          o recorte do Mestre. */}
      <div className="absolute inset-0 max-lg:hidden bg-gradient-to-r from-background via-background/85 to-background/30" />
      <div className="absolute inset-0 max-lg:hidden bg-gradient-to-t from-background via-transparent to-background/40" />

      {/* No celular o mesmo gradiente horizontal não funciona: o texto
          passa a ocupar a largura inteira e a ponta direita, com só 30%
          de cobertura, deixava a foto brigar com o parágrafo. Aqui o
          escurecimento é vertical — leve no topo, onde a imagem ainda
          respira, e fechando conforme desce até os CTAs. */}
      {/* A parada intermediária fica em 38% de propósito: é onde o texto
          começa. Acima disso a cobertura é leve e a imagem respira; a
          partir dali fecha para 90%, que é o que o desktop já faz na
          faixa esquerda onde mora o texto. Sem isso, um quadro claro do
          vídeo passava por trás do parágrafo. */}
      <div className="absolute inset-0 lg:hidden bg-gradient-to-b from-background/30 via-background/90 via-38% to-background" />

      {/* Recorte do Mestre Marcelo "quebrando" a base do Hero — mesma
          ideia de composição do hero oficial da Gracie Barra (referência
          visual, não copiado), adaptada com foto real e identidade
          própria. O fundo foi removido programaticamente do arquivo
          original (que trazia o xadrez de transparência achatado em
          pixels), então aqui é um PNG com alpha de verdade.
          Some no mobile: em telas pequenas competiria demais com o texto
          no mesmo espaço vertical. */}
      <motion.div
        initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden justify-end pr-4 lg:flex lg:pr-16"
      >
        <Image
          src="/images/marcelo-cutout.png"
          alt=""
          width={468}
          height={805}
          preload
          // A foto original termina abruptamente na altura das canelas.
          // O mask dissolve a base na cor de fundo em vez de deixar um
          // corte reto visível.
          style={{
            maskImage: 'linear-gradient(to top, transparent 0%, black 14%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 14%)',
          }}
          className="h-[86dvh] w-auto object-contain object-bottom"
        />
      </motion.div>

      <motion.div
        ref={contentRef}
        initial={initial}
        animate="show"
        variants={staggerContainer(0.12, 0.5)}
        className="relative mx-auto w-full max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl">
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 border-l-2 border-primary pl-3"
          >
            <span className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              <StaggerChars
                text="Jiu-Jitsu em Pirituba"
                duration={0.4}
                delay={0.02}
                className="text-inherit"
              />
            </span>
          </motion.div>

          <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            <RevealText
              mode="auto"
              direction="right"
              delay={0.7}
              stagger={0.09}
              duration={0.6}
              boxClassName="bg-primary"
            >
              Seu caminho começa no tatame.
            </RevealText>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty"
          >
            Treine Jiu-Jitsu em um ambiente de disciplina, respeito e evolução.
            Desenvolva sua técnica, seu condicionamento e sua confiança a cada treino.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <MapPin className="size-4 text-primary" />
            <span>{site.city}</span>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <CtaButton
                size="lg"
                href={whatsappLink('Olá! Gostaria de agendar uma aula na Gracie Barra Pirituba.')}
              >
                <WhatsAppIcon className="size-5" />
                Agendar uma aula
              </CtaButton>
            </Magnetic>
            <Magnetic>
              <CtaButton size="lg" variant="outline" href="#academia" external={false} className="w-full">
                Conhecer a academia
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </CtaButton>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  )
}
