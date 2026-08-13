import React from 'react';
import { cn } from '@/lib/utils';

type GlowingBorderCardProps = {
  children: React.ReactNode;
  /**
   * Classe de gradiente completa (ex: "from-primary to-red-900"), não
   * fragmentos de cor separados. O Tailwind resolve classes por análise
   * estática do código-fonte — um `from-${fromColor}` construído em
   * runtime nunca é gerado. Passar a classe inteira, literal, resolve
   * isso (bug real do componente original do ScrollX UI).
   */
  gradientClassName?: string;
  className?: string;
  contentClassName?: string;
};

export default function GlowingBorderCard({
  children,
  gradientClassName = 'from-primary to-primary/40',
  className,
  contentClassName,
}: GlowingBorderCardProps) {
  return (
    <div className={cn('relative group', className)}>
      <div
        className={cn(
          'absolute -inset-0.5 rounded-lg blur-sm opacity-60 transition-opacity duration-500 group-hover:opacity-100 bg-linear-to-r',
          gradientClassName,
        )}
      />
      <div
        className={cn(
          'relative flex h-full items-center justify-center rounded-lg bg-card',
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
