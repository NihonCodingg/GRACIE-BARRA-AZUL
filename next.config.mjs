/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sem escapes de build de propósito: o `typescript.ignoreBuildErrors` e
  // o `images.unoptimized` que vinham do scaffold do v0 foram removidos.
  //
  // ignoreBuildErrors deixava um erro de tipo passar direto para produção
  // — justamente o cenário em que ele custa mais caro. Com ele fora, o
  // deploy falha no CI em vez de falhar no navegador do visitante.
  //
  // images.unoptimized desligava o otimizador do Next: as fotos eram
  // servidas cruas, no tamanho original, para qualquer tela. Ligado, cada
  // imagem sai em WebP e no tamanho pedido pelo `sizes` de cada uso.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
