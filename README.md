# Gracie Barra Pirituba

Landing page da Gracie Barra Pirituba — academia de Jiu-Jitsu em Pirituba, São Paulo.

O objetivo do site é gerar contato no WhatsApp e agendamento de aula
experimental; o segundo objetivo é levar tráfego para o Instagram da
academia.

## Stack

| Camada | Escolha |
| --- | --- |
| Framework | Next.js 16 (App Router, React Server Components, Turbopack) |
| Linguagem | TypeScript 5.7 (strict) |
| Estilo | Tailwind CSS v4 (CSS-first, sem `tailwind.config.js`) |
| Componentes | shadcn/ui (estilo `base-nova`) sobre `@base-ui/react` |
| Motion | GSAP + ScrollTrigger, Motion, Anime.js, Lenis |

Não existe `tailwind.config.js`: na v4 os tokens são declarados em CSS,
dentro de `app/globals.css` (`@theme inline`).

## Rodando localmente

```bash
npm install
```

```bash
npm run dev
```

O site sobe em <http://localhost:3000>.

| Script | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Sobe o build de produção |
| `npm run typecheck` | Checagem de tipos sem emitir arquivos |

## As duas versões visuais (V1 e V2)

O projeto tem duas identidades de cor, no mesmo código e nos mesmos
componentes — o que muda são apenas os tokens de cor.

| Versão | Paleta | Como acessar |
| --- | --- | --- |
| **V2** (publicada) | Vermelho + **azul** + preto + branco | `/` |
| V1 (preservada) | Vermelho + preto + branco | `/?theme=v1` |

A V2 é a versão publicada: o `data-theme="v2"` é renderizado no servidor,
direto no `<html>` (`app/layout.tsx`), então chega pronto no HTML — sem
flash e sem JavaScript no caminho crítico.

A V1 continua inteira e recuperável. `?theme=v1` remove o atributo e a
página cai nos valores de `:root`, que são a V1. Ela também está
preservada no histórico do Git, no commit `V1: versão visual atual da
landing page`.

Estrutura, layout, tipografia, espaçamento, motion e responsividade são
idênticos entre as duas. Só as cores mudam.

### Papéis de cor da V2

Cada cor tem uma função, e é isso que impede a paleta de virar decoração:

- **Vermelho** — ação. CTAs, links, o que o visitante deve clicar.
- **Azul** — estrutura e atmosfera. Fundos, bordas, brilhos, detalhes.
- **Preto** — o chão da página.
- **Branco** — conteúdo. Texto e leitura.

Os tokens vivem em `app/globals.css`, no bloco `html[data-theme='v2']`.

## Organização

```
app/
  layout.tsx            metadata, fontes, tema publicado
  page.tsx              composição das seções
  globals.css           tokens de cor (V1 em :root, V2 em [data-theme])
  opengraph-image.tsx   cartão de compartilhamento gerado no build
  robots.ts / sitemap.ts
components/
  <secao>.tsx           uma seção da página por arquivo
  motion/               primitivos de animação compartilhados
  ui/                   componentes de biblioteca (shadcn + vendorizados)
hooks/
lib/
  site.ts               fonte única de contato, endereço e links
public/
  images/  videos/
```

As seções continuam Server Components sempre que possível. A animação
entra por componentes "slot" de cliente (`Reveal`, `RevealGroup`), então
o JavaScript de motion não é cobrado em cima do conteúdo.

## Conteúdo: o que é real

Todo dado exibido foi confirmado, não inventado. Endereço verificado no
Google Maps, telefone fornecido pela academia, grade de horários passada
pelo cliente, biografia do Mestre Marcelo e depoimentos transcritos de
avaliações reais do Google.

Onde uma informação não pôde ser confirmada, ela ficou de fora em vez de
ser preenchida por aproximação — ver `DEPLOY.md` para os itens que ainda
dependem de confirmação da academia.

## Publicação

O passo a passo de deploy está em [DEPLOY.md](DEPLOY.md).
