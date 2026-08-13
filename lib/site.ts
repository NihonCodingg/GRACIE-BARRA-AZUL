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
