'use client';
import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface MotionGridProps {
  speed?: string;
  opacity?: number;
  direction?: 'left' | 'right';
  lineColor?: string;
  lineWidth?: string;
  gridSpacing?: string;
  backgroundColor?: string;
  glowGradient?: string;
  enableGlow?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function MotionGrid({
  speed = '30s',
  opacity = 0.08,
  direction = 'right',
  // Cor de atmosfera do tema (vermelho na V1, azul na V2) no lugar do
  // verde/teal padrão do componente. Ver --decor-rgb em globals.css.
  lineColor = 'var(--decor-rgb)',
  lineWidth = '1px',
  gridSpacing = '20px',
  backgroundColor = 'transparent',
  enableGlow = false,
  className,
  children,
}: MotionGridProps) {
  const id = React.useId();
  const directionValue = direction === 'right' ? '40px' : '-40px';

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{ backgroundColor }}
    >
      <style jsx>{`
        @keyframes diagonalGridMove-${id} {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: ${directionValue} ${directionValue};
          }
        }
      `}</style>

      {enableGlow && (
        <div
          className={cn(
            'absolute inset-0 z-0',
            'bg-[radial-gradient(125%_125%_at_50%_10%,#100c0c_40%,#9a1e20_100%)]',
          )}
        />
      )}

      <motion.div
        style={
          {
            '--speed': speed,
            '--line-color': lineColor,
            '--opacity': opacity,
            '--line-width': lineWidth,
            '--grid-spacing': gridSpacing,
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(var(--line-color), var(--opacity)) 0, rgba(var(--line-color), var(--opacity)) var(--line-width), transparent var(--line-width), transparent var(--grid-spacing)),
              repeating-linear-gradient(-45deg, rgba(var(--line-color), var(--opacity)) 0, rgba(var(--line-color), var(--opacity)) var(--line-width), transparent var(--line-width), transparent var(--grid-spacing))
            `,
            backgroundSize: '40px 40px',
            animation: `diagonalGridMove-${id} var(--speed) linear infinite`,
          } as React.CSSProperties
        }
        className='absolute inset-0 z-10 pointer-events-none'
      />

      {children && <div className='relative z-20'>{children}</div>}
    </div>
  );
}
