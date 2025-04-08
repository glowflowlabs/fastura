"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Mail, Lock, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { siteConfig } from "@/config/site-config"
import { signIn } from "next-auth/react"

const formSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
  rememberMe: z.boolean().optional(),
})

type FormValues = z.infer<typeof formSchema>

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)

    try {
      // This is a mock login for MVP testing
      // In a real implementation, this would call an authentication API
      // await new Promise((resolve) => setTimeout(resolve, 1000))

      // For MVP, we'll just navigate to dashboard on any login attempt
      // toast.success("Login realizado com sucesso!")

      toast.error("Não implementado ainda")
      // Navigate to dashboard
      // navigate.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Erro ao fazer login. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            {siteConfig.name}
          </h1>
          <p className="text-muted-foreground">{siteConfig.description}</p>
        </div>

        <Card className="border shadow-lg">
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>
              Acesse sua conta para continuar sua jornada de jejum intermitente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            placeholder="seu@email.com"
                            type="email"
                            className="pl-10"
                            autoComplete="email"
                            disabled={isLoading}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            placeholder="******"
                            type="password"
                            className="pl-10"
                            autoComplete="current-password"
                            disabled={isLoading}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              id="remember"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={isLoading}
                            />
                          </FormControl>
                          <label
                            htmlFor="remember"
                            className="text-sm font-medium text-muted-foreground"
                          >
                            Lembrar de mim
                          </label>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Link
                    href="/reset-password"
                    className="text-sm font-medium text-fastsmart-purple hover:underline"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>

                <div className="pt-2">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        Entrando...{" "}
                        <ArrowRight className="h-4 w-4 animate-pulse" />
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Entrar <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">
                  ou continue com
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <Button
                onClick={() => {
                  signIn("google", {
                    callbackUrl: "/dashboard",
                    redirect: true,
                  })
                    .then(() => {
                      toast.success("Redirecionado para Login com Google!")
                    })
                    .catch((error) => {
                      console.error("Google login error:", error)
                      toast.error("Erro ao fazer login com Google.")
                    })
                }}
                variant="outline"
                className="w-full"
                type="button"
                disabled={isLoading}
              >
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                disabled={isLoading}
              >
                Apple
              </Button>
            </div>

            <div className="text-center text-sm">
              Não tem uma conta?{" "}
              <Link
                href="/register"
                className="text-fastsmart-purple hover:underline font-medium"
              >
                Criar conta
              </Link>
            </div>
          </CardFooter>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Ao entrar, você concorda com nossos{" "}
          <Link href="/terms" className="text-fastsmart-purple hover:underline">
            Termos de Serviço
          </Link>{" "}
          e{" "}
          <Link
            href="/privacy"
            className="text-fastsmart-purple hover:underline"
          >
            Política de Privacidade
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
