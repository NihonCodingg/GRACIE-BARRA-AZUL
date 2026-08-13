import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`dark bg-background ${inter.variable} ${oswald.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <CustomCursor />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
