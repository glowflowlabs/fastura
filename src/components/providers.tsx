"use client"

import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster as Sonner, Toaster } from "@/components/ui/sonner"
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { FastingProvider } from "@/contexts/FastingContext"

export function Providers({ children }: React.PropsWithChildren) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <FastingProvider>{children}</FastingProvider>
        </NextThemesProvider>
        {/* <NextAuthSessionProvider>{children}</NextAuthSessionProvider> */}
      </TooltipProvider>
    </QueryClientProvider>
  )
}
