# Checklist de publicação

Estado do projeto: **pronto para deploy**, com dois itens abertos que não
impedem a publicação (ver o final).

---

## 1. Já feito e verificado

Tudo aqui já está no código — é a lista do que foi conferido, para você
não precisar re-testar.

### Build e tipos

- [x] `npm run build` passa limpo
- [x] `npm run typecheck` passa limpo
- [x] `typescript.ignoreBuildErrors` removido do `next.config.mjs` — o
      build agora falha no CI em vez de falhar no navegador do visitante
- [x] Todas as rotas geradas como estáticas (`/`, `/opengraph-image`,
      `/robots.txt`, `/sitemap.xml`)

### Versão publicada

- [x] V2 (azul) é o tema padrão, renderizado no servidor — sem flash
- [x] V1 preservada e acessível em `?theme=v1`
- [x] V1 também preservada no histórico do Git
- [x] `themeColor` do navegador ajustado para o fundo da V2 (`#070c16`)

### Performance

- [x] Otimizador de imagens do Next ligado (`images.unoptimized` removido)
- [x] Peso das imagens da página: **2,78 MB → 0,28 MB**
- [x] Zero imagens servidas cruas — as 15 passam pelo otimizador
- [x] Lupa de hover (Lens) agora só carrega a imagem no primeiro hover;
      antes puxava os PNGs originais de 2 MB no carregamento da página
- [x] Vídeo do Hero comprimido: **12,46 MB → 1,93 MB** (−84,5%), sem
      perda visível (SSIM 0,989 contra o original) e sem a trilha de
      áudio, que o site nunca toca. Metadados movidos para o início do
      arquivo, então ele começa a rodar antes de terminar de baixar
- [x] Vídeo do Hero não carrega em conexão lenta nem com economia de
      dados ligada (a foto do Hero cobre o mesmo papel)
- [x] Peso total de mídia da página: **15,24 MB → 2,21 MB**

O vídeo original, sem compressão, continua guardado em
`VIDEO DO SITE/VIDEO PARA USAR NO SITE.mp4`, fora do repositório. Para
gerar `public/videos/hero.mp4` de novo a partir dele:

```bash
ffmpeg -i "VIDEO PARA USAR NO SITE.mp4" -an -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart hero.mp4
```

`-an` descarta o áudio (o vídeo toca mudo e a faixa sozinha custava
200 KB), `-crf 26` foi escolhido medindo: sobe para 2,54 MB no CRF 23
com ganho de qualidade imperceptível, e `+faststart` põe os metadados no
início do arquivo para ele começar a tocar antes de baixar inteiro.

### Responsividade

- [x] Mobile (375×812): sem scroll horizontal em nenhum ponto da página
- [x] Tablet (768×1024): sem scroll horizontal
- [x] Desktop: sem scroll horizontal
- [x] Grade de horários vira cards por dia no mobile
- [x] Console sem erros da aplicação

### Correções visuais desta rodada

- [x] Acentuação em português deixou de ser cortada nos textos animados.
      O Hero exibia "COMEÇA" como "COMECA" e a seção de horários exibia
      "HORÁRIOS" como "HORARIOS" — as caixas de recorte da animação eram
      justas demais para cedilha e acento
- [x] Risco solto que aparecia sobre o "g" de "Metodologia" e o "p" de
      "Depoimentos" no rodapé

### SEO

- [x] `metadataBase` configurável por ambiente
- [x] Open Graph e Twitter Card
- [x] Imagem de compartilhamento gerada no build (`opengraph-image.tsx`)
- [x] `robots.txt` e `sitemap.xml`
- [x] Dados estruturados schema.org (`SportsActivityLocation`) com
      endereço e telefone reais
- [x] `generator: 'v0.app'` removido do metadata

### Repositório

- [x] `.gitignore` cobrindo `node_modules`, `.next`, `.env*.local`,
      arquivos de build e cache
- [x] Placeholders do scaffold do v0 removidos de `public/`
- [x] `package.json` renomeado e sem script quebrado

---

## 2. Publicar na Vercel

1. **Importar o repositório**
   Em <https://vercel.com/new>, importar `NihonCodingg/GRACIE-BARRA-AZUL`.
   A Vercel detecta Next.js sozinha — não mexer em build command nem em
   output directory.

2. **Variável de ambiente**
   Depois que o domínio final estiver definido, criar:

   | Nome | Valor |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://dominio-final.com.br` |

   Ela alimenta o `metadataBase`, o `sitemap.xml` e o `robots.txt`. Sem
   ela o site funciona normalmente e cai na URL gerada pela Vercel — o
   que já é o comportamento certo para deploys de preview.

3. **Deploy.** Sem passo extra: o projeto não usa banco, API externa nem
   segredo nenhum.

4. **Domínio.** Apontar o domínio da academia em Settings → Domains e
   seguir as instruções de DNS. Depois de apontar, voltar ao passo 2 e
   atualizar a variável.

---

## 3. Conferir depois de publicar

- [ ] Abrir a home e confirmar que carrega na **V2 azul**
- [ ] Testar `?theme=v1` (a V1 precisa continuar acessível)
- [ ] Clicar em "Agendar uma aula" e confirmar que o WhatsApp abre com a
      mensagem pronta, no número `+55 11 99770-1201`
- [ ] Clicar no botão flutuante do WhatsApp
- [ ] Testar os links do Instagram (`@graciebarrapirituba`)
- [ ] Testar o link do Google Maps na seção de localização
- [ ] Abrir no celular de verdade, não só no emulador — principalmente o
      vídeo do Hero e a grade de horários
- [ ] Colar a URL no WhatsApp e conferir se o cartão de compartilhamento
      aparece com a imagem certa
- [ ] Validar os dados estruturados em
      <https://search.google.com/test/rich-results>
- [ ] Cadastrar o site no Google Search Console e enviar o `sitemap.xml`
- [ ] Rodar um Lighthouse e olhar o LCP do Hero

---

## 4. Itens abertos

### Informações que dependem da academia

Ficaram de fora por não terem confirmação — preencher exige só a
resposta, o código já está preparado:

| O que falta | Onde entra |
| --- | --- |
| Horário de funcionamento oficial | Hoje o rodapé mostra um horário deduzido da grade de aulas. Por isso ele **não** foi incluído nos dados estruturados: horário errado no Google faz aluno bater na porta fechada. Confirmar com a academia e adicionar `openingHours` em `components/structured-data.tsx` |
| Segunda professora | Uma avaliação no Google menciona uma "Lili" ao lado do Marcelo, só o primeiro nome. Faltam sobrenome, graduação e foto para criar o segundo card em `components/instructors.tsx` |

Uma observação sobre as 5,0 estrelas: elas são reais, mas foram
coletadas no Google. Republicar avaliação de terceiro como marcação
própria (`aggregateRating`) contraria as diretrizes de rich results do
Google e pode custar o snippet inteiro — por isso a nota aparece na
página, com link para o Google, mas não nos dados estruturados.
