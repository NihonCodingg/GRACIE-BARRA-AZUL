import { AnimeHeading } from '@/components/motion/anime-heading'
import StaggerChars from '@/components/ui/stagger-chars'
import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  /** Reveal caractere a caractere no título (Anime.js) em vez do estilo
   * padrão da seção. Usado com parcimônia — ver anime-heading.tsx. */
  animateTitle = false,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  animateTitle?: boolean
}) {
  const titleClassName =
    'font-display text-3xl font-bold uppercase leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl'
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            'mb-4 inline-flex items-center gap-2 border-l-2 border-primary pl-3',
            align === 'center' && 'border-l-0 border-b-2 pb-2 pl-0',
          )}
        >
          {/* Stagger Chars (ScrollX UI) — o eyebrow é o tipo de texto
              para o qual o efeito foi feito: display, caixa alta,
              tracking largo e curto o bastante para o flip ser legível. */}
          <span className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            <StaggerChars
              text={eyebrow}
              duration={0.4}
              delay={0.02}
              className="text-inherit"
            />
          </span>
        </div>
      )}
      {animateTitle ? (
        <AnimeHeading className={titleClassName}>{title}</AnimeHeading>
      ) : (
        <h2 className={titleClassName}>{title}</h2>
      )}
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
