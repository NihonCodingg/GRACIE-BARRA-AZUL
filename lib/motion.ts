// Fonte única de easing/duração para todo o motion design do site.
// Fica em JS (não em globals.css) porque Motion e GSAP consomem
// arrays/objetos JS diretamente — duplicar em CSS custom properties
// só criaria risco de dessincronia entre os dois formatos.

export const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const // expo-out

export const DURATION = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
} as const

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_CINEMATIC },
  },
}

export function staggerContainer(stagger = 0.08, delayChildren = 0) {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  }
}
