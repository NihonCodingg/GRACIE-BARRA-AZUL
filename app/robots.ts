import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

// Gerado em vez de escrito à mão para o endereço do sitemap acompanhar
// o domínio configurado em NEXT_PUBLIC_SITE_URL — um robots.txt estático
// apontaria para um domínio chumbado e quebraria em preview.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl()}/sitemap.xml`,
  }
}
