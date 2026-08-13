import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Inter, Oswald } from 'next/font/google'
import { SmoothScrollProvider } from '@/components/motion/smooth-scroll-provider'
import { CustomCursor } from '@/components/motion/custom-cursor'
import { site, siteUrl } from '@/lib/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
})

const TITLE = 'Gracie Barra Pirituba | Jiu-Jitsu em Pirituba, São Paulo'
const DESCRIPTION =
  'Treine Jiu-Jitsu na Gracie Barra Pirituba em um ambiente de disciplina, respeito e evolução. Agende sua aula pelo WhatsApp e comece sua jornada no tatame.'

export const metadata: Metadata = {
  // Sem metadataBase as tags og:image saem com caminho relativo, e as
  // redes sociais descartam a imagem ao gerar o preview do link.
  metadataBase: new URL(siteUrl()),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: site.name,
  keywords: [
    'Jiu-Jitsu Pirituba',
    'Gracie Barra Pirituba',
    'academia de Jiu-Jitsu São Paulo',
    'aula de Jiu-Jitsu',
    'BJJ Pirituba',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: site.name,
    url: '/',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  // Cor de fundo da V2 (--background do tema azul). Pinta a barra de
  // endereço no mobile na mesma cor da página, sem faixa clara no topo.
  themeColor: '#070c16',
  colorScheme: 'dark',
}

// Tema publicado: V2 (vermelho + azul + preto + branco).
//
// O data-theme='v2' vai direto no <html> renderizado no servidor, então
// o tema publicado chega pronto no HTML — zero flash, zero JavaScript no
// caminho crítico. Antes era o contrário (V1 padrão, V2 por query), o
// que faria o deploy publicar a versão errada.
//
// A V1 não foi descartada: continua inteira no CSS e acessível em
// ?theme=v1, além de estar preservada no histórico do Git (commit "V1:
// versão visual atual da landing page"). O script abaixo só existe para
// essa saída — remove o atributo e a página cai nos valores de :root,
// que são a V1.
//
// Vai por next/script com strategy="beforeInteractive" para rodar antes
// dos módulos do Next, aplicando a V1 já no primeiro frame. Um <script>
// cru dentro do JSX executaria, mas o React avisa no console que não o
// executa em render de cliente; feito num efeito, a página apareceria na
// V2 e piscaria para a V1 depois da hidratação.
//
// Não persiste em localStorage de propósito: a URL é a única fonte de
// verdade, e dá para deixar as duas versões abertas lado a lado em abas
// diferentes sem uma contaminar a outra.
const THEME_SCRIPT = `(function(){try{if(new URLSearchParams(location.search).get('theme')==='v1'){document.documentElement.removeAttribute('data-theme')}}catch(e){}})();`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      data-theme="v2"
      className={`dark bg-background ${inter.variable} ${oswald.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <Script
          id="theme-from-query"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
        />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <CustomCursor />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
