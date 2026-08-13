'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

type CursorState = 'default' | 'link' | 'image' | 'cta' | 'drag'

const LABELS: Partial<Record<CursorState, string>> = {
  image: 'VIEW',
  drag: 'DRAG',
}

const SIZES: Record<CursorState, number> = {
  default: 10,
  link: 56,
  cta: 44,
  image: 72,
  drag: 72,
}

// Cursor customizado, desktop only (pointer fino + hover disponível).
// Elementos que devem alterar o estado recebem `data-cursor="link" |
// "image" | "cta" | "drag"`. Delegação de evento única no document — não
// um listener por elemento interativo.
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState<CursorState>('default')
  const reducedMotion = useReducedMotion()

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)
  const x = useSpring(rawX, { stiffness: 500, damping: 40, mass: 0.4 })
  const y = useSpring(rawY, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    const mql = window.matchMedia('(hover: hover) and (pointer: fine)')
    setEnabled(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!enabled || reducedMotion) return

    function onMove(e: MouseEvent) {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }
    function onOver(e: MouseEvent) {
      const target = (e.target as HTMLElement | null)?.closest?.('[data-cursor]')
      const next = target?.getAttribute('data-cursor') as CursorState | null
      setState(next ?? 'default')
    }
    function onOut(e: MouseEvent) {
      const related = (e.relatedTarget as HTMLElement | null)?.closest?.('[data-cursor]')
      if (!related) setState('default')
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onOut, { passive: true })
    document.documentElement.classList.add('custom-cursor-active')

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [enabled, reducedMotion, rawX, rawY])

  if (!enabled || reducedMotion) return null

  const label = LABELS[state]
  const size = SIZES[state]

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border border-primary bg-primary/15 backdrop-blur-[1px]"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: size, height: size }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {label && (
        <span className="font-display text-[10px] font-semibold uppercase tracking-widest text-primary">
          {label}
        </span>
      )}
    </motion.div>
  )
}
