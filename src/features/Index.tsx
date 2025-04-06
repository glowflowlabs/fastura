"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Clock, BookOpen, Calendar, Check, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { siteConfig } from "@/config/site-config"
import Image from "next/image"

// Form schema for lead capture
const leadFormSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  name: z
    .string()
    .min(2, { message: "Nome deve ter ao menos 2 caracteres" })
    .optional(),
})

type LeadFormValues = z.infer<typeof leadFormSchema>

const testimonials = [
  {
    name: "Maria Silva",
    role: "Perdeu 12kg em 6 meses",
    content:
      "O FastSmart transformou minha relação com a comida. O jejum intermitente se tornou parte natural da minha rotina graças ao acompanhamento personalizado.",
  },
  {
    name: "João Oliveira",
    role: "Melhorou níveis de energia",
    content:
      "Depois de 3 meses usando o app, minha clareza mental e foco melhoraram consideravelmente. O coach AI me ajudou a ajustar meu plano para maximizar benefícios.",
  },
  {
    name: "Ana Costa",
    role: "Controlou diabetes tipo 2",
    content:
      "Com orientação médica e o suporte do FastSmart, consegui melhorar significativamente meus níveis de glicose. O app me lembra da hidratação e monitora meu progresso.",
  },
]

const features = [
  {
    title: "Planos Personalizados",
    description:
      "Protocolos adaptados ao seu estilo de vida, metas e condição física",
    icon: Calendar,
  },
  {
    title: "Coach IA Vertical",
    description: "Orientação especializada em tempo real baseada em ciência",
    icon: BookOpen,
  },
  {
    title: "Monitoramento Preciso",
    description:
      "Acompanhe seu progresso com cronômetros precisos e alertas inteligentes",
    icon: Clock,
  },
]

const plans = [
  {
    name: "Plano 16:8",
    description:
      "O clássico protocolo de 16 horas de jejum e 8 horas de alimentação.",
    price: "Gratuito",
    features: [
      "Cronômetro de jejum",
      "Lembretes de hidratação",
      "Conteúdo educacional básico",
      "Monitoramento de progresso",
    ],
    popular: false,
    buttonText: "Começar Agora",
    buttonVariant: "outline",
    id: "16-8",
  },
  {
    name: "Plano 18:6",
    description:
      "Um jejum mais avançado com 18 horas de jejum e 6 horas de alimentação.",
    price: "R$ 19,90/mês",
    features: [
      "Todos os recursos do plano 16:8",
      "Coach AI personalizado",
      "Análise de dados avançada",
      "Comunidade premium",
      "Suporte prioritário",
    ],
    popular: true,
    buttonText: "Experimente Grátis",
    buttonVariant: "default",
    id: "18-6",
  },
  {
    name: "OMAD",
    description: "Uma refeição por dia, consumida em um período de 1 hora.",
    price: "R$ 29,90/mês",
    features: [
      "Todos os recursos do plano 18:6",
      "Consultas com nutricionistas",
      "Planos nutricionais personalizados",
      "Integração com wearables",
      "Relatórios semanais detalhados",
    ],
    popular: false,
    buttonText: "Experimente Grátis",
    buttonVariant: "outline",
    id: "omad",
  },
]

const LandingPage = () => {
  const navigate = useRouter()
  const [openDialog, setOpenDialog] = useState(false)
  const [leadCaptured, setLeadCaptured] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  // Form for lead capture
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  })

  const trackPlanClick = (planId: string) => {
    console.log(`Landing page: User clicked on plan ${planId}`)
    setSelectedPlan(planId)

    // Store selected plan in localStorage
    localStorage.setItem("selectedPlan", planId)

    // Show lead capture dialog
    setOpenDialog(true)
  }

  const onSubmitLead = (data: LeadFormValues) => {
    // In a real app, this would send data to your backend
    console.log("Lead captured:", data)
    console.log("Selected plan:", selectedPlan)

    // Store user data
    localStorage.setItem("userLead", JSON.stringify(data))

    // Close dialog and show success message
    setOpenDialog(false)
    setLeadCaptured(true)

    toast.success("Obrigado pelo seu interesse! Redirecionando...")

    // Navigate to onboarding
    setTimeout(() => {
      navigate.push("/onboarding")
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-background/95 backdrop-blur sticky top-0 z-10 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center ">
            <Image
              alt={siteConfig.description}
              src={"/logo-fastura.png"}
              width={100}
              height={100}
            />
            {/* <Clock className="h-6 w-6 text-fastsmart-purple" /> */}
            <span className="font-bold text-xl">{siteConfig.name}</span>
          </div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Recursos</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] md:grid-cols-2">
                    {features.map((feature) => (
                      <li key={feature.title} className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="#features"
                            onClick={() =>
                              console.log(
                                `User clicked on feature: ${feature.title}`
                              )
                            }
                          >
                            <feature.icon className="h-6 w-6 text-fastsmart-purple" />
                            <div className="mb-2 mt-4 text-lg font-medium">
                              {feature.title}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              {feature.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Planos</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {plans.map((plan) => (
                      <li key={plan.name}>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href="#pricing"
                            onClick={() =>
                              console.log(
                                `Nav menu: User clicked on plan ${plan.id}`
                              )
                            }
                          >
                            <div className="text-sm font-medium leading-none">
                              {plan.name}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {plan.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a
                  href="#testimonials"
                  className={navigationMenuTriggerStyle()}
                >
                  Depoimentos
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                console.log("User clicked login")
                navigate.push("/login")
              }}
            >
              Login
            </Button>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  onClick={() => {
                    console.log("User clicked on get started CTA")
                    setOpenDialog(true)
                  }}
                >
                  Começar Grátis
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Comece sua jornada de saúde</DialogTitle>
                  <DialogDescription>
                    Deixe seu email para receber dicas exclusivas e acompanhar
                    seu progresso
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmitLead)}
                    className="space-y-4 mt-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome" {...field} />
                          </FormControl>
                          <FormDescription>
                            Opcional, mas nos ajuda a personalizar sua
                            experiência
                          </FormDescription>
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
                            Fique tranquilo, não enviamos spam
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end space-x-3 mt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setOpenDialog(false)
                          navigate.push("/onboarding")
                        }}
                      >
                        Pular
                      </Button>
                      <Button type="submit">Continuar</Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-background to-background/90">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Transforme sua saúde com
              <span className="text-fastsmart-purple"> jejum intermitente</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-md">
              FastSmart combina IA avançada e ciência para guiar sua jornada em
              direção a uma melhor saúde metabólica, clareza mental e
              longevidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="rounded-full"
                    onClick={() => {
                      console.log("User clicked main CTA button")
                      setOpenDialog(true)
                    }}
                  >
                    Comece sua jornada
                  </Button>
                </DialogTrigger>
              </Dialog>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full"
                onClick={() => {
                  console.log("User clicked learn more")
                  navigate.push("/education")
                }}
              >
                Aprenda mais
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-fastsmart-purple/20 to-fastsmart-purple/5 p-1">
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-background to-muted flex items-center justify-center">
                <div className="text-center p-6">
                  <Clock className="h-16 w-16 mx-auto text-fastsmart-purple mb-4" />
                  <div className="text-4xl font-bold mb-2">16:8</div>
                  <div className="text-sm text-muted-foreground">
                    Plano de jejum mais popular
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 size-32 bg-fastsmart-purple/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Recursos Projetados para seu Sucesso
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nossa plataforma oferece tudo que você precisa para ter sucesso em
              sua jornada de jejum intermitente.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="border-none shadow-md glass-card hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="size-12 flex items-center justify-center rounded-full bg-fastsmart-purple/10 mb-4">
                    <feature.icon className="size-6 text-fastsmart-purple" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Planos Adaptados para Cada Jornada
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano que melhor se adapta às suas necessidades e metas
              de saúde.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "relative overflow-hidden transition-all duration-300 hover:shadow-lg",
                  plan.popular ? "border-fastsmart-purple shadow-lg" : "border"
                )}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="text-xs font-semibold bg-fastsmart-purple text-white px-3 py-1 rounded-bl-lg">
                      Mais Popular
                    </div>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="size-5 mr-2 text-fastsmart-purple" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full rounded-full"
                    variant={plan.buttonVariant as "default" | "outline"}
                    onClick={() => trackPlanClick(plan.id)}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Histórias de Sucesso</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Veja como o FastSmart está transformando vidas através do jejum
              intermitente.
            </p>
          </div>

          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="border-none shadow-md">
                    <CardContent className="p-6">
                      <p className="text-lg mb-6 italic">
                        {`"${testimonial.content}"`}
                      </p>
                      <div className="flex items-center">
                        <div className="size-12 rounded-full bg-fastsmart-purple/20 flex items-center justify-center mr-4">
                          <span className="font-semibold text-fastsmart-purple">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="relative inset-0 translate-y-0 left-0 mr-2 size-9" />
              <CarouselNext className="relative inset-0 translate-y-0 right-0 size-9" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-fastsmart-purple/20 to-background">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Transformar Sua Saúde?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Junte-se a milhares de pessoas que estão melhorando sua saúde com o
            FastSmart.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="rounded-full"
                onClick={() => {
                  console.log("User clicked on final CTA")
                  setOpenDialog(true)
                }}
              >
                Comece Sua Jornada Hoje <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Estamos quase lá!</DialogTitle>
                <DialogDescription>
                  Deixe seu email para receber dicas personalizadas e acompanhar
                  seu progresso
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmitLead)}
                  className="space-y-4 mt-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome" {...field} />
                        </FormControl>
                        <FormDescription>
                          Opcional, mas nos ajuda a personalizar sua experiência
                        </FormDescription>
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
                          Para acompanhar seu progresso e receber dicas
                          exclusivas
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-3 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setOpenDialog(false)
                        navigate.push("/onboarding")
                      }}
                    >
                      Pular
                    </Button>
                    <Button type="submit">Continuar</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-muted">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <Clock className="h-6 w-6 text-fastsmart-purple" />
              <span className="font-bold text-xl">FastSmart</span>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-fastsmart-purple transition-colors"
              >
                Termos
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-fastsmart-purple transition-colors"
              >
                Privacidade
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-fastsmart-purple transition-colors"
              >
                Contato
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} FastSmart. Todos os direitos
            reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
