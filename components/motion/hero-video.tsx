'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// TESTE VISUAL — fundo do Hero em vídeo, exclusivo da V2.
//
// Como a V1 fica intocada: o <video> só é montado depois de checar, no
// cliente, que data-theme === 'v2'. Na V1 o componente devolve null, e
// como o elemento nunca entra no DOM o navegador não baixa um byte
// sequer do arquivo.
//
// A imagem do Hero continua sendo renderizada por baixo, de propósito:
// ela pinta primeiro (segura o LCP enquanto o vídeo carrega) e continua
// valendo de fallback se o autoplay for bloqueado ou o vídeo falhar.
// O vídeo só aparece — em fade — depois de estar pronto para tocar.
//
// Fica dentro do mesmo wrapper animado da imagem, então herda o
// clip-path de entrada, o scale de abertura e o scrub de saída do
// scroll: o tratamento cinematográfico do Hero é o mesmo dos dois.
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isV2, setIsV2] = useState(false)
  const [ready, setReady] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    setIsV2(document.documentElement.dataset.theme === 'v2')
  }, [])

  // Com prefers-reduced-motion o vídeo não entra: fundo em movimento
  // contínuo é exatamente o que essa preferência pede para evitar.
  if (!isV2 || reducedMotion) return null

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      onCanPlay={() => setReady(true)}
      className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out ${
        ready ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <source src="/videos/hero.mp4" type="video/mp4" />
    </video>
  )
}
