import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Domínios essenciais permitidos por padrão na CSP
const NECESSARY_DOMAIN =
  "*.sentry.io http://localhost:* http://127.0.0.1:* https://analytics.google.com googletagmanager.com *.googletagmanager.com https://www.google-analytics.com https://api.github.com"

export function middleware(request: NextRequest) {
  // Habilita CSP apenas em produção e se existir uma whitelist configurada
  const isWhiteListEnabled =
    !!process.env.NEXT_PUBLIC_CSP_WHITELIST &&
    process.env.NODE_ENV === "production"

  // Se não estiver habilitado, simplesmente continua o fluxo
  if (!isWhiteListEnabled) return NextResponse.next()

  // Combina whitelist de ambiente com domínios necessários
  const whiteList = `${process.env.NEXT_PUBLIC_CSP_WHITELIST} ${NECESSARY_DOMAIN}`

  // Gera um nonce único para scripts inline seguros
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64")
  const csp = `'nonce-${nonce}'`

  // Esquemas permitidos para várias diretivas
  const scheme_source = "data: mediastream: blob: filesystem:"

  // Construção da política de segurança de conteúdo
  const cspHeader = `
    default-src 'self' ${scheme_source} ${csp} ${whiteList};
    connect-src 'self' ${scheme_source} ${csp} ${whiteList};
    script-src 'self' ${scheme_source} ${csp} ${whiteList};
    style-src 'self' 'unsafe-inline' ${scheme_source} ${whiteList};
    worker-src 'self' ${scheme_source} ${csp} ${whiteList};
    media-src 'self' ${scheme_source} ${csp} ${whiteList};
    img-src 'self' ${scheme_source} ${csp} ${whiteList};
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    upgrade-insecure-requests;
  `
  // Normaliza o cabeçalho CSP
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim()

  // Cria novos headers com nonce e CSP
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-nonce", nonce)
  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  )

  // Propagação do CSP para a resposta
  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  )

  return response
}

// export const config = {
//   matcher: [
//     // Aplica o middleware em todas as rotas exceto:
//     // - Arquivos estáticos do Next.js
//     // - Otimização de imagens
//     // - Favicon
//     {
//       source: "/((?!_next/static|_next/image|favicon.ico).*)",
//     },
//   ],
// }
