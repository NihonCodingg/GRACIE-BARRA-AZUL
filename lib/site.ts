// Central place for contact/links.
export const site = {
  name: 'Gracie Barra Pirituba',
  city: 'Pirituba — São Paulo',
  instagramHandle: 'graciebarrapirituba',
  instagramUrl: 'https://instagram.com/graciebarrapirituba',
  // Endereço real confirmado via Google Maps.
  addressLine: 'R. Arruda da Câmara, 109 - Vila Pereira Cerca, São Paulo - SP, 02935-120',
  mapsQuery: 'R. Arruda da Câmara, 109, Vila Pereira Cerca, São Paulo - SP, 02935-120',
  // Número real de WhatsApp pra agendar aula, fornecido pelo cliente.
  // Formato internacional, só dígitos (55 + DDD + número).
  whatsappNumber: '5511997701201',
} as const

// URL pública do site, usada como metadataBase (Open Graph, sitemap,
// robots). Precisa ser absoluta para as tags og:* funcionarem quando o
// link é compartilhado.
//
// A ordem de precedência resolve o problema clássico de "de onde vem o
// domínio": em produção com domínio próprio, defina NEXT_PUBLIC_SITE_URL
// nas variáveis de ambiente. Sem ela, cai na URL gerada pela Vercel
// (VERCEL_PROJECT_PRODUCTION_URL), que é o comportamento correto para
// deploys de preview. Localmente, cai em localhost.
//
// Fica como função e não como constante porque em Server Components o
// valor é lido a cada request — assim uma troca de domínio não exige
// rebuild do módulo.
export function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  return 'http://localhost:3000'
}

// Contato real de WhatsApp da academia. Canal principal pra "Agendar uma
// aula" — o Instagram Direct continua disponível como via alternativa em
// toda a página (site.instagramUrl / instagramDmLink()).
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

// Instagram Direct — formato oficial da Meta, abre o composer de DM no
// app/Instagram web. site.instagramUrl (perfil) continua disponível em
// paralelo como via alternativa.
export function instagramDmLink() {
  return `https://ig.me/m/${site.instagramHandle}`
}

// Usado no CTA "Ver mais avaliações no Google" da seção de depoimentos.
export function googleReviewsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`
}

export const navLinks = [
  { label: 'A Academia', href: '#academia' },
  { label: 'Jiu-Jitsu', href: '#jiu-jitsu' },
  { label: 'Metodologia', href: '#metodologia' },
  { label: 'Horários', href: '#horarios' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Instagram', href: '#instagram' },
]
