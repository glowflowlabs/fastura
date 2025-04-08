"use client"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Home, Calendar, BookOpen, UserCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

type AppLayoutProps = {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navigationItems = [
    { path: "/dashboard", label: "Início", icon: Home },
    { path: "/dashboard/plans", label: "Planos", icon: Calendar },
    { path: "/dashboard/education", label: "Aprender", icon: BookOpen },
    { path: "/dashboard/profile", label: "Perfil", icon: UserCircle },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 pb-16 pt-4">
        {children}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 bg-background border-t dark:border-gray-800 pb-safe-area-inset-bottom">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex flex-col items-center py-1 px-3 rounded-lg transition-colors",
                    isActive
                      ? "text-fastsmart-purple font-medium"
                      : "text-gray-500 hover:text-fastsmart-purple"
                  )}
                >
                  <item.icon
                    size={20}
                    className={cn(
                      isActive ? "text-fastsmart-purple" : "text-gray-500"
                    )}
                  />
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              )
            })}

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full h-10 w-10"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}
