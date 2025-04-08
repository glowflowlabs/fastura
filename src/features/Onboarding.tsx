"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

import { Card, CardContent } from "@/components/ui/card"
import { useFasting } from "@/contexts/FastingContext"
import {
  ArrowRight,
  Clock,
  Battery,
  BrainCircuit,
  Scale,
  Heart,
} from "lucide-react"
import { useRouter } from "next/navigation"

const OnboardingSteps = [
  {
    title: "Bem-vindo ao FastSmart",
    description:
      "Seu assistente de jejum intermitente com IA integrada para maximizar seus resultados.",
    image: "brain-circuit",
  },
  {
    title: "Escolha seu objetivo",
    description:
      "O jejum intermitente traz múltiplos benefícios. Qual é sua principal meta?",
    goals: [
      { id: "weight-loss", label: "Perda de peso", icon: Scale },
      { id: "energy", label: "Mais energia", icon: Battery },
      { id: "mental", label: "Clareza mental", icon: BrainCircuit },
      { id: "health", label: "Saúde geral", icon: Heart },
    ],
  },
  {
    title: "Escolha seu plano",
    description:
      "Recomendamos começar com um plano mais simples e progredir conforme sua adaptação.",
    showPlans: true,
  },
  {
    title: "Estamos prontos!",
    description:
      "Seu assistente FastSmart está configurado. Vamos iniciar sua jornada de jejum intermitente?",
    finalStep: true,
  },
]

const Onboarding = () => {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null)
  const { plans, selectPlan, currentPlan } = useFasting()

  // Executar apenas no client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasCompletedOnboarding = localStorage.getItem(
        "hasCompletedOnboarding"
      )
      if (hasCompletedOnboarding === "true") {
        router.push("/")
      }

      setMounted(true)
    }
  }, [router])

  const handleNext = () => {
    if (currentStep < OnboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      localStorage.setItem("hasCompletedOnboarding", "true")
      router.push("/")
    }
  }

  const handleSelectGoal = (goalId: string) => {
    setSelectedGoal(goalId)
  }

  const handleSelectPlan = (planId: string) => {
    selectPlan(planId)
  }

  const currentStepData = OnboardingSteps[currentStep]

  // Não renderizar nada até montagem no client-side
  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-12 bg-gradient-to-b from-background to-fastsmart-purple/5">
      <div className="max-w-md mx-auto w-full space-y-8 animate-fade-in">
        {/* Progress indicator */}
        <div className="flex justify-center space-x-1 mb-8">
          {OnboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? "w-8 bg-fastsmart-purple"
                  : index < currentStep
                  ? "w-8 bg-fastsmart-purple/60"
                  : "w-4 bg-fastsmart-purple/20"
              }`}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">{currentStepData.title}</h1>
          <p className="text-muted-foreground">{currentStepData.description}</p>
        </div>

        {/* Illustration or content */}
        <div className="my-8">
          {currentStepData.image === "brain-circuit" && (
            <div className="flex justify-center">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-fastsmart-purple to-fastsmart-blue-dark rounded-full opacity-20 animate-pulse-ring" />
                <div className="bg-gradient-to-br from-fastsmart-purple to-fastsmart-blue-dark p-6 rounded-full">
                  <BrainCircuit className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
          )}

          {currentStepData.goals && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {currentStepData.goals.map((goal) => (
                <Card
                  key={goal.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedGoal === goal.id
                      ? "card-neumorph border-fastsmart-purple"
                      : "border hover:border-fastsmart-purple/50"
                  }`}
                  onClick={() => handleSelectGoal(goal.id)}
                >
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <goal.icon
                      className={`h-8 w-8 mb-2 ${
                        selectedGoal === goal.id
                          ? "text-fastsmart-purple"
                          : "text-muted-foreground"
                      }`}
                    />
                    <span className="text-sm">{goal.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {currentStepData.showPlans && (
            <div className="space-y-4">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`cursor-pointer transition-all duration-300 overflow-hidden ${
                    currentPlan?.id === plan.id
                      ? "card-neumorph border-fastsmart-purple"
                      : "border hover:border-fastsmart-purple/50"
                  }`}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{plan.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>
                          {plan.fastHours}:{plan.eatHours}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {plan.description}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      {plan.benefits[0]}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {currentStepData.finalStep && (
            <div className="flex justify-center">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-fastsmart-purple rounded-full opacity-20 animate-pulse-ring" />
                <div className="bg-gradient-to-br from-fastsmart-purple to-fastsmart-blue-dark p-6 rounded-full">
                  <Clock className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div>
          <Button
            className="w-full rounded-full"
            onClick={handleNext}
            disabled={
              (currentStepData.goals && !selectedGoal) ||
              (currentStepData.showPlans && !currentPlan)
            }
          >
            {currentStep === OnboardingSteps.length - 1 ? (
              "Começar"
            ) : (
              <>
                Continuar
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
