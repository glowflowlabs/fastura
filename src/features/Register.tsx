"use client"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Checkbox } from "@/components/ui/checkbox"
import { User, Mail, Lock, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { siteConfig } from "@/config/site-config"

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Você precisa aceitar os termos de uso",
  }),
})

type FormValues = z.infer<typeof formSchema>

const Register = () => {
  const navigate = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      termsAccepted: false,
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)

    // Simulating API call
    console.log("Register attempt with:", data)

    try {
      // This is a mock registration for MVP testing
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For MVP tracking, log which users registered
      console.log("MVP TRACKING: New user registration")

      // Store user data for MVP tracking
      localStorage.setItem("userName", data.name)
      localStorage.setItem("userEmail", data.email)
      localStorage.setItem("registrationDate", new Date().toISOString())

      toast.success("Conta criada com sucesso! Bem-vindo ao FastSmart.")

      // Navigate to onboarding
      navigate.push("/onboarding")
    } catch (error) {
      console.error("Registration error:", error)
      toast.error("Erro ao criar conta. Tente novamente.")
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
            <CardTitle>Criar sua conta</CardTitle>
            <CardDescription>
              Comece sua jornada de jejum intermitente hoje e transforme sua
              saúde
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            placeholder="Seu nome"
                            className="pl-10"
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
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          Eu aceito os{" "}
                          <Link
                            href="/terms"
                            className="text-fastsmart-purple hover:underline"
                          >
                            Termos de Serviço
                          </Link>{" "}
                          e{" "}
                          <Link
                            href="/privacy"
                            className="text-fastsmart-purple hover:underline"
                          >
                            Política de Privacidade
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        Criando conta...{" "}
                        <ArrowRight className="h-4 w-4 animate-pulse" />
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Criar conta <ArrowRight className="h-4 w-4" />
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
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="text-fastsmart-purple hover:underline font-medium"
              >
                Entrar
              </Link>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-2">
              Seu email nos ajudará a personalizar sua experiência e fornecer
              dicas exclusivas sobre jejum intermitente.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Register
