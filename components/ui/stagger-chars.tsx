'use client';
import * as React from 'react';
import {
  AnimatePresence,
  motion,
  type Variants,
  useReducedMotion,
  type Easing,
} from 'motion/react';
import { cn } from '@/lib/utils';

interface StaggerCharsProps {
  text: string;
  hoverText?: string;
  delay?: number;
  duration?: number;
  className?: string;
  hoverClassName?: string;
  direction?: 'up' | 'down' | 'alternate';
  easing?: Easing;
  disabled?: boolean;
  /**
   * Em telas de toque o componente original entra num loop infinito
   * (anima sozinho a cada 2s, para sempre). Com muitas instâncias na
   * página isso vira ruído visual e gasto de bateria, então aqui o
   * comportamento é opt-in: por padrão o efeito é só de hover.
   */
  autoAnimateOnTouch?: boolean;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

const useProcessedChars = (text: string, hoverText?: string) =>
  React.useMemo(() => {
    const base = text.split('');
    const hover = (hoverText ?? text).split('');
    const max = Math.max(base.length, hover.length);

    return {
      safeBase: Array.from({ length: max }, (_, i) => base[i] ?? ' '),
      safeHover: Array.from({ length: max }, (_, i) => hover[i] ?? ' '),
    };
  }, [text, hoverText]);

const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = React.useState(false);

  React.useEffect(() => {
    const check = () =>
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);

    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isTouch;
};

// Altura de cada "slot" da pilha de caracteres.
//
// O original usava 1em, mas com line-height 1 a tinta do glifo não cabe
// em 1em: a descendente de g/p/q/ç desce cerca de 0.16em abaixo da
// caixa. Isso causava dois defeitos ao mesmo tempo:
//
//  1. o rabinho do caractere visível era cortado no rodapé do slot;
//  2. pior, em caracteres de índice par a cópia de hover é empilhada
//     ACIMA da visível — e a descendente dela invadia o topo da janela,
//     desenhando um risco solto sobre a letra. Era isso que aparecia em
//     "Metodolo(g)ia" e "De(p)oimentos" no rodapé.
//
// A folga precisa existir dos DOIS lados. Abaixo, para a descendente.
// Acima, porque em caixa alta o acento de Á/Ã/Ê sobe além da altura das
// maiúsculas: com o slot justo, "TURMAS E HORÁRIOS" era exibido como
// "HORARIOS", sem acento nenhum.
//
// 1.4em de altura com 0.2em de recuo no topo acomoda os dois extremos
// (a tinta vai de ~-0.2em a ~+1.16em em relação à caixa de linha). O
// percurso da animação continua sendo 50% da pilha, então as translações
// seguem válidas sem nenhuma outra mudança.
const SLOT_H = 'h-[1.4em]'
const SLOT_PT = 'pt-[0.2em]'

// A janela recortada é inline-block com overflow hidden, então o CSS usa
// a borda inferior dela como linha de base. Crescer o slot empurraria o
// texto para cima em relação à copy vizinha; a margem negativa devolve
// exatamente a folga adicionada, preservando o ritmo vertical original.
const SLOT_BASELINE_FIX = 'mb-[-0.2em]'

const getInitialY = (
  direction: StaggerCharsProps['direction'],
  isEven: boolean,
) => {
  switch (direction) {
    case 'up':
      return '0%';
    case 'down':
      return '-50%';
    case 'alternate':
    default:
      return isEven ? '-50%' : '0%';
  }
};

const getTargetY = (
  direction: StaggerCharsProps['direction'],
  isEven: boolean,
) => {
  switch (direction) {
    case 'up':
      return '-50%';
    case 'down':
      return '0%';
    case 'alternate':
    default:
      return isEven ? '0%' : '-50%';
  }
};

const StaggerChars = React.memo<StaggerCharsProps>(
  ({
    text,
    hoverText,
    hoverClassName,
    delay = 0.05,
    duration = 1,
    className,
    direction = 'alternate',
    easing = [0.22, 1, 0.36, 1],
    disabled = false,
    autoAnimateOnTouch = false,
    onAnimationStart,
    onAnimationComplete,
  }) => {
    const { safeBase, safeHover } = useProcessedChars(text, hoverText);
    const prefersReducedMotion = useReducedMotion();
    const isTouchDevice = useIsTouchDevice();

    const [isHovered, setIsHovered] = React.useState(false);
    const [isAutoAnimating, setIsAutoAnimating] = React.useState(false);
    const intervalRef = React.useRef<NodeJS.Timeout | undefined>(undefined);

    React.useEffect(() => {
      if (!autoAnimateOnTouch || !isTouchDevice || disabled) return;
      const timeout = setTimeout(() => {
        setIsAutoAnimating(true);
        onAnimationStart?.();
        intervalRef.current = setInterval(
          () => setIsAutoAnimating((prev) => !prev),
          2000,
        );
      }, 1000);

      return () => {
        clearTimeout(timeout);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [isTouchDevice, disabled, onAnimationStart]);

    const containerVariants: Variants = {
      initial: {},
      hover: {
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : delay,
        },
      },
      exit: {},
    };

    const stackVariants: Variants = {
      initial: ({ isEven }: { index: number; isEven: boolean }) =>
        prefersReducedMotion
          ? { y: '0%' }
          : { y: getInitialY(direction, isEven) },
      hover: ({ index, isEven }: { index: number; isEven: boolean }) =>
        prefersReducedMotion
          ? { y: '0%' }
          : {
              y: getTargetY(direction, isEven),
              transition: {
                duration,
                delay: index * delay,
                ease: easing,
              },
            },
      exit: ({ isEven }: { index: number; isEven: boolean }) =>
        prefersReducedMotion
          ? { y: '0%' }
          : { y: getInitialY(direction, isEven) },
    };

    const handleHoverStart = () => {
      if (disabled || isTouchDevice) return;
      setIsHovered(true);
      onAnimationStart?.();
    };

    const handleHoverEnd = () => {
      if (disabled || isTouchDevice) return;
      setIsHovered(false);
      onAnimationComplete?.();
    };

    return (
      <AnimatePresence mode='wait'>
        {/* Raiz é <span inline-block>, não <div>: assim o componente é
            HTML válido dentro de <p>, <span>, <a> e headings — que é
            onde ele é usado. Como <div>, quebrava a hidratação ao cair
            dentro de um <p>. */}
        <motion.span
          className={cn(
            'relative inline-block h-fit uppercase text-black dark:text-white leading-none',
            'select-none transform-gpu will-change-transform',
            !disabled && 'cursor-pointer',
            className,
          )}
          variants={containerVariants}
          initial='initial'
          exit='exit'
          whileHover={disabled || isTouchDevice ? undefined : 'hover'}
          animate={
            isTouchDevice && !disabled
              ? isAutoAnimating
                ? 'hover'
                : 'initial'
              : undefined
          }
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          style={{ perspective: 1000 }}
          role='text'
          aria-label={text}
          aria-live={isHovered ? 'polite' : undefined}
        >
          {safeBase.map((char, index) => {
            const nextChar = safeHover[index];
            const isSpace = char === ' ' && nextChar === ' ';
            const isEven = index % 2 === 0;

            return (
              <span
                key={index}
                className={cn(
                  'inline-block align-baseline overflow-hidden transform-gpu will-change-transform relative',
                  SLOT_H,
                  SLOT_BASELINE_FIX,
                )}
                style={{ lineHeight: 1 }}
                aria-hidden='true'
              >
                <motion.span
                  className='block relative'
                  variants={stackVariants}
                  custom={{ index, isEven }}
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                    lineHeight: 1,
                  }}
                >
                  {isEven && (
                    <span
                      className={cn(
                        'block leading-none',
                        SLOT_H,
                        SLOT_PT,
                        hoverClassName,
                      )}
                      style={{ lineHeight: 1 }}
                    >
                      {isSpace ? '\u00A0' : nextChar}
                    </span>
                  )}
                  <span
                    className={cn('block leading-none', SLOT_H, SLOT_PT)}
                    style={{ lineHeight: 1 }}
                  >
                    {isSpace ? '\u00A0' : char}
                  </span>
                  {!isEven && (
                    <span
                      className={cn(
                        'block leading-none',
                        SLOT_H,
                        SLOT_PT,
                        hoverClassName,
                      )}
                      style={{ lineHeight: 1 }}
                    >
                      {isSpace ? '\u00A0' : nextChar}
                    </span>
                  )}
                </motion.span>
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    );
  },
);

StaggerChars.displayName = 'StaggerChars';
export type { StaggerCharsProps };
export default StaggerChars;
