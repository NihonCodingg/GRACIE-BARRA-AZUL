'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { navLinks, whatsappLink } from '@/lib/site'
import { CtaButton } from '@/components/cta-button'
import { WhatsAppIcon } from '@/components/icons'
import { Magnetic } from '@/components/motion/magnetic'
import StaggerChars from '@/components/ui/stagger-chars'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const reducedMotion = useReducedMotion()

  useLenis((lenis) => {
    setScrolled(lenis.scroll > 24)
    // Esconde ao descer, revela ao subir — nunca esconde perto do topo,
    // pra não sumir o header assim que a página carrega.
    if (lenis.scroll < 200) {
      setHidden(false)
      return
    }
    if (lenis.direction === 1) setHidden(true)
    else if (lenis.direction === -1) setHidden(false)
  })

  return (
    <motion.header
      animate={{ y: hidden && !open ? '-100%' : '0%' }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300',
        scrolled || open
          ? 'border-b border-border bg-background/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between px-4 transition-[height] duration-300 sm:px-6 lg:px-8',
          scrolled ? 'h-14' : 'h-16 lg:h-20',
        )}
      >
        <a href="#top" className="flex items-center gap-2" aria-label="Gracie Barra Pirituba - início">
          <Image src="/images/logo.png" alt="" width={40} height={40} className="size-9" preload />
          <span className="hidden font-display text-sm font-semibold uppercase leading-tight tracking-wide sm:block">
            <StaggerChars text="Gracie Barra" duration={0.4} delay={0.02} className="text-inherit" />
            <span className="block text-xs font-normal text-muted-foreground">Pirituba</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor="link"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {/* Stagger Chars (ScrollX UI): caracteres viram no hover
                  revelando o mesmo texto, em vez de um underline simples. */}
              <StaggerChars
                text={link.label}
                duration={0.4}
                delay={0.02}
                className="text-inherit normal-case"
              />
            </a>
          ))}
        </nav>

        <Magnetic className="hidden lg:block">
          <CtaButton href={whatsappLink('Olá! Gostaria de agendar uma aula na Gracie Barra Pirituba.')}>
            <WhatsAppIcon className="size-4" />
            Agendar uma aula
          </CtaButton>
        </Magnetic>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-sm text-foreground lg:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4" aria-label="Navegação mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-sm px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <CtaButton
              className="mt-3 w-full"
              href={whatsappLink('Olá! Gostaria de agendar uma aula na Gracie Barra Pirituba.')}
            >
              <WhatsAppIcon className="size-4" />
              Agendar uma aula
            </CtaButton>
          </nav>
        </div>
      )}
    </motion.header>
  )
}
