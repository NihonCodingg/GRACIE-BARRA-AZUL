'use client'

import { motion } from 'motion/react'
import { animate } from 'animejs'
import { WhatsAppIcon } from '@/components/icons'
import { useAnimeScope } from '@/hooks/use-anime-scope'
import { whatsappLink } from '@/lib/site'

export function WhatsAppFloat() {
  // Anel de pulso lento (Anime.js): chama atenção para o CTA mais
  // persistente da página sem piscar nem competir com o conteúdo.
  // Loop longo e opacidade baixa de propósito.
  const rootRef = useAnimeScope<HTMLDivElement>(() => {
    animate('.whatsapp-pulse', {
      scale: [1, 1.7],
      opacity: [0.5, 0],
      duration: 2400,
      ease: 'outQuad',
      loop: true,
    })
  })

  return (
    <div ref={rootRef} className="fixed bottom-5 right-5 z-50">
      <span
        aria-hidden="true"
        className="whatsapp-pulse pointer-events-none absolute inset-0 rounded-full bg-primary"
      />
      <motion.a
        href={whatsappLink('Olá! Gostaria de agendar uma aula na Gracie Barra Pirituba.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Agendar uma aula pelo WhatsApp"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <WhatsAppIcon className="size-7" />
      </motion.a>
    </div>
  )
}
