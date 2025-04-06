"use client"
import { useState } from "react"

import AppLayout from "@/components/layout/AppLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"
import { useFasting } from "@/contexts/FastingContext"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter ao menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }).optional(),
  goals: z.string().optional(),
  mobileNumber: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

const Profile = () => {
  const navigate = useRouter()
  const { currentPlan } = useFasting()
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      goals: "",
      mobileNumber: "",
    },
  })

  const onSubmit = (data: FormValues) => {
    // In a real app, this would send data to your backend
    console.log("User profile data:", data)

    // Log which plan the user was interested in
    console.log("User selected plan:", currentPlan?.id)

    // Show success message
    toast.success("Perfil salvo com sucesso! Entraremos em contato em breve.")
    setSubmitted(true)

    // In a real implementation, you would save this to your database
    localStorage.setItem("userProfile", JSON.stringify(data))

    // Navigate back to plans page after submission
    setTimeout(() => {
      navigate.push("/dashboard/plans")
    }, 2000)
  }

  return (
    <AppLayout>
      <div className="max-w-md mx-auto px-4 py-6 animate-fade-in">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Seus Dados</CardTitle>
            <CardDescription>
              Compartilhe suas informações para personalizar sua experiência e
              receber dicas exclusivas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} />
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
                        <Input placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Receba dicas personalizadas e acompanhamento (opcional,
                        mas recomendado)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Celular</FormLabel>
                      <FormControl>
                        <Input placeholder="(00) 00000-0000" {...field} />
                      </FormControl>
                      <FormDescription>
                        Opcional - para lembretes via WhatsApp
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="goals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seus objetivos com o jejum</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ex: Perda de peso, saúde metabólica, mais energia..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full rounded-full">
                  Salvar Perfil
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

export default Profile
