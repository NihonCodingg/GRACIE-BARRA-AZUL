'use client';

import { motion } from 'motion/react';
import { TypeAnimation } from 'react-type-animation';
import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

type LibrarySpeedType = ComponentProps<typeof TypeAnimation>['speed'];

type SpeedType = number | 'slow' | 'normal' | 'fast';

interface TypeanimationProps {
  words?: string[];
  className?: string;
  typingSpeed?: SpeedType;
  deletingSpeed?: SpeedType;
  pauseDuration?: number;
  /**
   * Classe de gradiente completa (ex: "from-primary to-foreground"). Ver
   * nota em glowingbordercard.tsx — o Tailwind não resolve
   * `from-${var}` construído em runtime, só classes literais.
   */
  gradientClassName?: string;
}

const Typeanimation = ({
  words = [' existence', ' reality', ' the Internet'],
  className,
  typingSpeed = 50,
  deletingSpeed = 50,
  pauseDuration = 1000,
  gradientClassName = 'from-primary to-foreground',
}: TypeanimationProps) => {
  const sequence = words.flatMap((word) => [word, pauseDuration]);

  return (
    <motion.span
      className={cn(
        'bg-clip-text text-transparent bg-linear-to-r',
        gradientClassName,
        className,
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <TypeAnimation
        sequence={sequence}
        wrapper='span'
        repeat={Infinity}
        className=''
        speed={typingSpeed as LibrarySpeedType}
        deletionSpeed={deletingSpeed as LibrarySpeedType}
      />
    </motion.span>
  );
};

export default Typeanimation;
