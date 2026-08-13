'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ParallaxCard {
  /** Classe de fundo do card (ex: "bg-card"). Os nomes `lightBg`/`darkBg`
   * do componente original vinham de um par claro/escuro fixo — aqui o
   * site é dark-only, então um único `cardClassName` basta. */
  cardClassName?: string;
  content: React.ReactNode;
}

interface ParallaxCardsProps {
  cards?: ParallaxCard[];
  /** Altura de cada card empilhado (padrão 70vh, igual ao original). */
  cardHeight?: string;
  /** Se falso, não renderiza o espaçador final de 100vh do componente
   * original — útil quando a seção seguinte já cria transição própria. */
  trailingSpacer?: boolean;
  className?: string;
}

export default function ParallaxCards({
  cards,
  cardHeight = '70vh',
  trailingSpacer = true,
  className,
}: ParallaxCardsProps) {
  const cardCount = cards?.length || 0;

  return (
    <div className={cn('relative w-full', className)}>
      <div style={{ height: `calc(${cardCount} * ${cardHeight})` }} className='relative'>
        {cards?.map((card, index) => (
          // z-index crescente: sem isso, a borda do card anterior (bem
          // mais visível quando ele tem uma cor/elemento de fundo forte,
          // como a parede vermelha da "Comunidade") vaza por cima do
          // próximo card durante a transição do sticky-stack.
          <div
            key={index}
            className='sticky top-0'
            style={{ height: cardHeight, zIndex: index + 1 }}
          >
            <Card
              className={cn(
                'relative h-full w-full overflow-hidden rounded-none border-0 p-0',
                card.cardClassName,
              )}
            >
              {card.content}
            </Card>
          </div>
        ))}
      </div>
      {trailingSpacer && <div className='h-[15vh] bg-background' />}
    </div>
  );
}
