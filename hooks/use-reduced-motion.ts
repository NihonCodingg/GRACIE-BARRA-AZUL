'use client'

import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

// Hook agnóstico de biblioteca de animação: tanto os componentes que usam
// Motion quanto os que usam GSAP consultam este mesmo sinal, para que
// reduced-motion seja respeitado de forma consistente em todo o site.
export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    setReducedMotion(mql.matches)

    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return reducedMotion
}
