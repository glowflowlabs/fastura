import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/config/auth-config"
import { prisma } from "./prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 }, // 1 dia
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    async jwt({ token, account }) {
      // Captura o token do Spotify no primeiro login
      if (account?.provider === "spotify" && account?.access_token) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expiresAt = account.expires_at
        token.code = account.code
      }
      return token
    },
    async session({ session, token }) {
      // Adiciona o token à sessão
      session.accessToken = token.accessToken as string
      session.code = token.code as string
      session.expiresAt = token.expiresAt as number
      return session
    },
  },
  ...authConfig,
})
