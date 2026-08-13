import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { site } from '@/lib/site'

export const alt = `${site.name} — Jiu-Jitsu em Pirituba, São Paulo`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Cartão de compartilhamento gerado em build time, no lugar de um JPEG
// estático: o texto acompanha lib/site.ts, então trocar o nome ou a
// cidade não deixa a imagem desatualizada.
//
// A paleta é a da V2 publicada — fundo azul-noite, vermelho da marca no
// filete e no traço de destaque. Sem fonte customizada de propósito: o
// next/og já embute uma fonte padrão, e buscar a Oswald pela rede
// tornaria o build dependente do Google Fonts estar no ar.
export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), 'public/images/logo.png'))
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#070c16',
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={92} height={92} alt="" />
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              letterSpacing: 8,
              textTransform: 'uppercase',
              color: '#7fa9d8',
            }}
          >
            {site.city}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', width: 132, height: 8, background: '#cc2827' }} />
          <div
            style={{
              display: 'flex',
              marginTop: 32,
              fontSize: 86,
              lineHeight: 1,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#f8f8f8',
            }}
          >
            Seu caminho começa no tatame
          </div>
          <div style={{ display: 'flex', marginTop: 28, fontSize: 34, color: '#9fb4cd' }}>
            {site.name} — disciplina, respeito e evolução
          </div>
        </div>
      </div>
    ),
    size,
  )
}
