'use client'

import { useEffect, useRef } from 'react'
import { createScope, type Scope } from 'animejs'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// `scope` é opcional para casar com o ScopeConstructorCallback do
// Anime.js, que declara o parâmetro como opcional.
type AnimeSetup = (scope?: Scope) => void

// Wrapper do padrão oficial do Anime.js v4 em React (createScope + revert
// no unmount), com o guard de prefers-reduced-motion do projeto embutido.
// Existe para não repetir esse boilerplate em cada componente que usa
// Anime.js — a mesma ideia do useGSAP() que já usamos para GSAP.
//
// Devolve a ref que deve ser aplicada ao elemento raiz: os seletores
// usados dentro do setup são resolvidos apenas dentro dela.
export function useAnimeScope<T extends HTMLElement>(
  setup: AnimeSetup,
  deps: unknown[] = [],
) {
  const rootRef = useRef<T>(null)
  const reducedMotion = useReducedMotion()
  // Guardado numa ref para o efeito não precisar do setup nas deps — a
  // identidade da função muda a cada render e recriaria o scope à toa.
  const setupRef = useRef(setup)
  setupRef.current = setup

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return
    const scope = createScope({ root: rootRef }).add((self) => setupRef.current(self))
    return () => scope.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, ...deps])

  return rootRef
}
