'use client';

import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SpotlightCardProps extends React.ComponentProps<typeof Card> {
  spotlightColor?: string;
  children: React.ReactNode;
  /** Classes do CardContent interno — o componente original força
   * `justify-center items-center`, o que não serve para conteúdo
   * alinhado à esquerda (ex: ícone + título + parágrafo editorial). */
  contentClassName?: string;
}

export function SpotlightCard({
  spotlightColor = '14, 165, 233',
  children,
  className,
  contentClassName,
  style,
  ...props
}: SpotlightCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  const backgroundImage = useMotionTemplate`radial-gradient(300px circle at ${spotlightX}px ${spotlightY}px, rgba(${spotlightColor}, 0.15), transparent)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    mouseX.set(x);
    mouseY.set(y);
    spotlightX.set(x);
    spotlightY.set(y);
  };

  return (
    <Card
      className={`group relative overflow-hidden border rounded-lg ${
        className ?? ''
      }`}
      style={
        {
          '--spotlight-color': spotlightColor,
          ...style,
        } as React.CSSProperties
      }
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        className='pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100'
        style={{ backgroundImage }}
      />
      <CardContent
        className={cn(
          'flex h-full w-full flex-col items-center justify-center p-6',
          contentClassName,
        )}
      >
        {children}
      </CardContent>
    </Card>
  );
}
