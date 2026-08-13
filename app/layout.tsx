import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Inter, Oswald } from 'next/font/google'
import { SmoothScrollProvider } from '@/components/motion/smooth-scroll-provider'
import { CustomCursor } from '@/components/motion/custom-cursor'
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

export const metadata: Metadata = {
  title: 'Gracie Barra Pirituba | Jiu-Jitsu em Pirituba, São Paulo',
  description:
    'Treine Jiu-Jitsu na Gracie Barra Pirituba em um ambiente de disciplina, respeito e evolução. Agende sua aula pelo WhatsApp e comece sua jornada no tatame.',
  generator: 'v0.app',
  keywords: [
    'Jiu-Jitsu Pirituba',
    'Gracie Barra Pirituba',
    'academia de Jiu-Jitsu São Paulo',
    'aula de Jiu-Jitsu',
    'BJJ Pirituba',
  ],
  openGraph: {
    title: 'Gracie Barra Pirituba | Jiu-Jitsu em Pirituba, São Paulo',
    description:
      'Treine Jiu-Jitsu em um ambiente de disciplina, respeito e evolução. Agende sua aula pelo WhatsApp.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export const viewport: Viewport = {
  themeColor: '#141110',
  colorScheme: 'dark',
}

// Seleção de tema por query string: ?theme=v2 abre a V2, qualquer outra
// coisa (inclusive sem query) abre a V1.
//
// Vai por next/script com strategy="beforeInteractive": o script é
// injetado no HTML inicial e roda antes dos módulos do Next, então o
// tema já vale no primeiro frame. Um <script> cru dentro do JSX também
// executaria no load, mas o React avisa no console que não o executa em
// render de cliente — beforeInteractive é a forma sancionada e deixa o
// console limpo. Feito num efeito do React, a página apareceria na V1 e
// piscaria para a V2 depois da hidratação.
//
// Não persiste em localStorage de propósito: assim a URL é a única fonte
// de verdade e dá para deixar as duas versões abertas lado a lado em
// abas diferentes sem uma contaminar a outra.
const THEME_SCRIPT = `(function(){try{var t=new URLSearchParams(location.search).get('theme');if(t==='v2'){document.documentElement.setAttribute('data-theme','v2')}}catch(e){}})();`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
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
