"use client"
import AppLayout from "@/components/layout/AppLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useFasting } from "@/contexts/FastingContext"
import {
  Clock,
  CalendarRange,
  CalendarCheck,
  CalendarClock,
  InfoIcon,
  Check,
  ArrowRight,
} from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const Plans = () => {
  const { plans, currentPlan, selectPlan, startFast, fastingState } =
    useFasting()
  const router = useRouter()
  // const [planClicked, setPlanClicked] = useState<string | null>(null)

  const handleSelectPlan = (planId: string) => {
    // Track which plan was selected
    console.log(`User selected plan: ${planId}`)
    // setPlanClicked(planId)

    // Analytics tracking would go here in a real app
    selectPlan(planId)

    // Show toast message
    toast.success(
      "Plano selecionado! Adicione seus dados para personalizar sua experiência.",
      {
        action: {
          label: "Adicionar dados",
          onClick: () => router.push("/profile"),
        },
      }
    )
  }

  const handleStartFast = () => {
    if (typeof window !== "undefined" && currentPlan) {
      // Check if user has provided profile info
      const userProfile = localStorage.getItem("userProfile")

      if (!userProfile) {
        // Encourage user to add profile data
        toast.info(
          "Para uma experiência personalizada, recomendamos adicionar seus dados.",
          {
            action: {
              label: "Adicionar agora",
              onClick: () => router.push("/profile"),
            },
          }
        )

        // Give user a few seconds to see the toast before starting fast anyway
        setTimeout(() => {
          startFast(currentPlan.id)
          router.push("/dashboard")
        }, 3000)
      } else {
        startFast(currentPlan.id)
        router.push("/dashboard")
      }
    }
  }

  const handlePlanClick = (planId: string) => {
    handleSelectPlan(planId)

    // After selecting plan, encourage profile completion
    setTimeout(() => {
      if (!localStorage.getItem("userProfile")) {
        toast.info("Complete seu perfil para receber dicas personalizadas!", {
          action: {
            label: "Completar",
            onClick: () => router.push("/profile"),
          },
        })
      }
    }, 2000)
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Planos de Jejum</h1>
          <p className="text-muted-foreground">
            Escolha o protocolo que melhor se adapta às suas necessidades
          </p>
        </div>

        <div className="space-y-4">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`transition-all duration-300 overflow-hidden ${
                currentPlan?.id === plan.id
                  ? "card-neumorph border-fastsmart-purple"
                  : "hover:shadow-md"
              }`}
              onClick={() => handlePlanClick(plan.id)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${
                        currentPlan?.id === plan.id
                          ? "bg-fastsmart-purple/20"
                          : "bg-muted"
                      }`}
                    >
                      {plan.id === "16-8" && (
                        <Clock
                          className={`h-5 w-5 ${
                            currentPlan?.id === plan.id
                              ? "text-fastsmart-purple"
                              : "text-muted-foreground"
                          }`}
                        />
                      )}
                      {plan.id === "18-6" && (
                        <CalendarRange
                          className={`h-5 w-5 ${
                            currentPlan?.id === plan.id
                              ? "text-fastsmart-purple"
                              : "text-muted-foreground"
                          }`}
                        />
                      )}
                      {plan.id === "20-4" && (
                        <CalendarCheck
                          className={`h-5 w-5 ${
                            currentPlan?.id === plan.id
                              ? "text-fastsmart-purple"
                              : "text-muted-foreground"
                          }`}
                        />
                      )}
                      {plan.id === "omad" && (
                        <CalendarClock
                          className={`h-5 w-5 ${
                            currentPlan?.id === plan.id
                              ? "text-fastsmart-purple"
                              : "text-muted-foreground"
                          }`}
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold flex items-center">
                        {plan.name}
                        {currentPlan?.id === plan.id && (
                          <Check className="h-4 w-4 ml-2 text-fastsmart-purple" />
                        )}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        {plan.fastHours}h jejum / {plan.eatHours}h alimentação
                      </div>
                    </div>
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full h-8 w-8"
                        >
                          <InfoIcon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="max-w-xs">
                        <div className="space-y-2">
                          <p className="font-medium">Benefícios:</p>
                          <ul className="text-xs space-y-1">
                            {plan.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {plan.description}
                </p>

                <div className="flex justify-end">
                  {currentPlan?.id === plan.id ? (
                    <div className="space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => router.push("/profile")}
                        className="rounded-full"
                      >
                        Perfil <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                      <Button
                        onClick={handleStartFast}
                        className="rounded-full"
                        disabled={fastingState.isFasting}
                      >
                        {fastingState.isFasting
                          ? "Jejum em andamento"
                          : "Iniciar Jejum"}
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => handleSelectPlan(plan.id)}
                      className="rounded-full"
                    >
                      Selecionar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Cards */}
        <div className="mt-8 space-y-4">
          <Card className="glass-card">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Como escolher seu plano</h3>
              <p className="text-sm text-muted-foreground">
                Para iniciantes, recomendamos começar com o plano 16:8 e,
                conforme sua adaptação, progredir para planos mais avançados.
                Ouça seu corpo e consulte um profissional de saúde se
                necessário.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Dica do Coach AI</h3>
              <p className="text-sm text-muted-foreground">
                Independente do plano escolhido, mantenha-se bem hidratado
                durante o período de jejum. Água, chás sem açúcar e café preto
                são permitidos e ajudam a controlar a fome.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}

export default Plans
