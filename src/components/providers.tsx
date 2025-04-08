"use client"

import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster as Sonner, Toaster } from "@/components/ui/sonner"
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import { FastingProvider } from "@/contexts/FastingContext"
import { ThemeProvider } from "./theme-provider"
import { useEffect, useState } from "react"

export function Providers({ children }: React.PropsWithChildren) {
  const queryClient = new QueryClient()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="fastsmart-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <NextAuthSessionProvider>
            <FastingProvider>{children}</FastingProvider>
          </NextAuthSessionProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
