import React from 'react'
import { cn } from '@/lib/utils'

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T
  className?: string
  contentClassName?: string
  children?: React.ReactNode
  color?: string
  speed?: React.CSSProperties['animationDuration']
  thickness?: number
}

// React Bits "Star Border", adaptado para a identidade Gracie Barra:
// - cor padrão = vermelho da marca (era branco)
// - miolo usa os tokens do projeto (bg-card/border-border) no lugar do
//   gradiente preto→cinza fixo do original
// - raio segue o --radius do site (cantos quase retos) em vez do
//   rounded-[20px] fixo, mantendo o shape lock da página
// - conteúdo/padding controláveis por prop, para não impor o tamanho de
//   botão do componente original
//
// Os keyframes star-movement-* vivem em app/globals.css (Tailwind v4 é
// CSS-first; o snippet de tailwind.config.js do original não se aplica).
const StarBorder = <T extends React.ElementType = 'div'>({
  as,
  className,
  contentClassName,
  color = 'var(--color-primary)',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'div'

  return (
    <Component
      className={cn('relative inline-block overflow-hidden rounded-sm', className)}
      {...(rest as Record<string, unknown>)}
      style={{
        padding: `${thickness}px 0`,
        ...(rest as { style?: React.CSSProperties }).style,
      }}
    >
      <div
        aria-hidden="true"
        className="animate-star-movement-bottom absolute bottom-[-11px] right-[-250%] z-0 h-1/2 w-[300%] rounded-full opacity-70"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        aria-hidden="true"
        className="animate-star-movement-top absolute left-[-250%] top-[-10px] z-0 h-1/2 w-[300%] rounded-full opacity-70"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className={cn(
          'relative z-[1] rounded-sm border border-border bg-card text-center',
          contentClassName,
        )}
      >
        {children}
      </div>
    </Component>
  )
}

export default StarBorder
