import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

// Uma landing page de rota única: o sitemap tem uma entrada só. Existe
// mesmo assim porque é por ele que o Search Console descobre e monitora
// a indexação da página.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl(),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
