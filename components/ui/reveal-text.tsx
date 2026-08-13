'use client';

import React, { useRef } from 'react';
import { motion, useAnimation, useInView } from 'motion/react';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right';
type Mode = 'manual' | 'auto';

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  boxClassName?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  mode?: Mode;
  stagger?: number;
  once?: boolean;
}

const baseBoxStyles =
  'absolute inset-0 z-10 bg-neutral-900 dark:bg-neutral-100';

const RevealText: React.FC<RevealTextProps> = ({
  children,
  className = '',
  boxClassName = '',
  delay = 0,
  duration = 0.8,
  direction = 'down',
  mode = 'manual',
  stagger = 0.1,
  once = true,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once });
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.set('initial');
      controls.start('animate');
    } else if (!once) {
      controls.start('initial');
    }
  }, [inView, controls, once]);

  const getAnimationValues = () => {
    switch (direction) {
      case 'up':
        return {
          initial: { scaleY: 1, originY: 0 },
          animate: { scaleY: 0 },
        };
      case 'down':
        return {
          initial: { scaleY: 1, originY: 1 },
          animate: { scaleY: 0 },
        };
      case 'left':
        return {
          initial: { scaleX: 1, originX: 0 },
          animate: { scaleX: 0 },
        };
      case 'right':
        return {
          initial: { scaleX: 1, originX: 1 },
          animate: { scaleX: 0 },
        };
    }
  };

  const animationValues = getAnimationValues();

  // O overflow-hidden aqui não esconde texto deslizando — o texto só faz
  // fade; ele existe só para recortar a caixa de cobertura (absolute
  // inset-0) nos limites da palavra. Só que a altura da caixa vem do
  // line-height, e os headlines do site usam leading apertado (0.95).
  // Resultado: em português, a cedilha de "COMEÇA" caía fora do box e
  // sumia — o Hero lia "COMECA". Descendentes de 'g'/'p'/'ç' e acentos
  // altos ('Ã') estouram o mesmo limite.
  //
  // O padding vertical devolve o espaço do glifo (a caixa de cobertura
  // cresce junto, o que é o certo: ela precisa cobrir a palavra inteira)
  // e a margem negativa equivalente cancela o ganho no fluxo, mantendo o
  // ritmo entre as linhas exatamente como estava. Em em, acompanha
  // qualquer tamanho de fonte.
  const glyphRoom = 'py-[0.3em] my-[-0.3em]'

  const renderWord = (word: string, i: number) => (
    <span key={i} className={cn('relative inline-block overflow-hidden mr-2', glyphRoom)}>
      <motion.span
        variants={{
          initial: animationValues.initial,
          animate: animationValues.animate,
        }}
        initial='initial'
        animate={controls}
        transition={{
          delay: delay + i * stagger,
          duration,
          ease: [0.76, 0, 0.24, 1],
        }}
        className={cn(baseBoxStyles, boxClassName)}
      />

      <motion.span
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        }}
        initial='initial'
        animate={controls}
        transition={{
          delay: delay + i * stagger + duration * 0.5,
          duration: duration * 0.5,
        }}
        className={className}
      >
        {word}
      </motion.span>
    </span>
  );

  if (mode === 'auto' && typeof children === 'string') {
    const words = children.split(' ');
    return (
      <span ref={ref} className='inline-block'>
        {words.map(renderWord)}
      </span>
    );
  }

  return (
    <span ref={ref} className={cn('relative inline-block overflow-hidden', glyphRoom)}>
      <motion.span
        variants={{
          initial: animationValues.initial,
          animate: animationValues.animate,
        }}
        initial='initial'
        animate={controls}
        transition={{
          delay,
          duration,
          ease: [0.76, 0, 0.24, 1],
        }}
        className={cn(baseBoxStyles, boxClassName)}
      />

      <motion.span
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        }}
        initial='initial'
        animate={controls}
        transition={{
          delay: delay + duration * 0.5,
          duration: duration * 0.5,
        }}
        className={className}
      >
        {children}
      </motion.span>
    </span>
  );
};

export { RevealText };
