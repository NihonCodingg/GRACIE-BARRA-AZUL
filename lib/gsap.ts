import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Guard: este módulo é importado por Client Components que também renderizam
// no servidor (SSR do próprio client component) — registerPlugin não deve
// rodar fora do browser.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }
