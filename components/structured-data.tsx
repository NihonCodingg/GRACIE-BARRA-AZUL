import { site, siteUrl } from '@/lib/site'

// Dados estruturados schema.org — é por aqui que o Google entende que a
// página é um negócio local em Pirituba, e não um texto qualquer sobre
// Jiu-Jitsu. Alimenta o painel lateral da busca e a associação com o
// perfil do Google Maps.
//
// Só entram fatos confirmados: endereço verificado no Maps, telefone
// fornecido pelo cliente e o Instagram oficial. Ficam de fora, de
// propósito:
//
// - `openingHours`: o horário que aparece no rodapé é uma dedução a
//   partir da grade de aulas, não o horário de funcionamento informado
//   pela academia. Dado deduzido vira fato quando entra aqui, e um
//   horário errado no Google faz aluno bater na porta fechada.
// - `aggregateRating`: as 5,0 estrelas são do Google, coletadas na
//   plataforma deles. Republicar avaliação de terceiro como marcação
//   própria contraria as diretrizes de rich results do Google e pode
//   custar o snippet inteiro.
//
// Ambos podem ser preenchidos assim que a academia confirmar — ver
// DEPLOY.md.
export function StructuredData() {
  const url = siteUrl()

  const data = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    '@id': `${url}#academia`,
    name: site.name,
    description:
      'Academia de Jiu-Jitsu em Pirituba, São Paulo. Aulas para adultos, mulheres e crianças em um ambiente de disciplina, respeito e evolução.',
    url,
    telephone: `+${site.whatsappNumber}`,
    image: `${url}/images/hero.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'R. Arruda da Câmara, 109',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      postalCode: '02935-120',
      addressCountry: 'BR',
    },
    sameAs: [site.instagramUrl],
  }

  return (
    <script
      type="application/ld+json"
      // JSON-LD é o único caso em que injetar HTML aqui é a prática
      // recomendada: o conteúdo é serializado por nós, não vem de fora.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
