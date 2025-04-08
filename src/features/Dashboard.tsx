"use client"
import AppLayout from "@/components/layout/AppLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useFasting } from "@/contexts/FastingContext"
import {
  Play,
  Square,
  DropletIcon,
  ChevronRight,
  BrainCircuit,
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { siteConfig } from "@/config/site-config"

const Dashboard = () => {
  const {
    fastingState,
    startFast,
    endFast,
    formattedTime,
    currentPlan,
    waterLogs,
    logWater,
    lastWaterLog,
  } = useFasting()
  const router = useRouter()
  const [aiTip, setAiTip] = useState<string>("")

  // Tips from AI coach
  const aiTips = useMemo(
    () => [
      "Beba água regularmente para ajudar a controlar a sensação de fome durante o jejum.",
      "Chás sem adoçantes são permitidos e podem ajudar a manter o jejum mais confortável.",
      "A autofagia é mais intensa após 16-18 horas de jejum, continue firme!",
      "Sentindo fome intensa? Tente uma caminhada leve ou meditação por 10 minutos.",
      "O jejum intermitente melhora a sensibilidade à insulina, ajudando no controle da glicemia.",
      "Receba benefícios cognitivos: o jejum aumenta a produção de BDNF, proteína que promove a saúde cerebral.",
      "Já completou 70% do seu jejum? A autopurificação celular está acontecendo agora!",
      "A sensação de fome vem em ondas. Se persistir, espere 20 minutos - ela geralmente passa.",
    ],
    []
  )

  // Check if user needs onboarding
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem(
      "hasCompletedOnboarding"
    )
    if (hasCompletedOnboarding !== "true") {
      router.push("/dashboard/")
    }
  }, [router])

  // Get random AI tip
  useEffect(() => {
    const randomTip = aiTips[Math.floor(Math.random() * aiTips.length)]
    setAiTip(randomTip)

    // Change tip every 3 minutes
    const intervalId = setInterval(() => {
      const newTip = aiTips[Math.floor(Math.random() * aiTips.length)]
      setAiTip(newTip)
    }, 3 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [aiTips])

  const handleStartFast = () => {
    if (!currentPlan) {
      router.push("/dasboard/plans")
      return
    }
    startFast(currentPlan.id)
  }

  const formatHoursLeft = () => {
    if (!fastingState.isFasting || !fastingState.remainingTime) return ""

    const hours = Math.floor(fastingState.remainingTime / 3600)
    const minutes = Math.floor((fastingState.remainingTime % 3600) / 60)

    return `${hours}h ${minutes}m restantes`
  }

  const canDrinkWater = () => {
    if (!lastWaterLog) return true

    // Can log water every 30 minutes
    const timeSinceLastLog = Date.now() - lastWaterLog.getTime()
    return timeSinceLastLog >= 30 * 60 * 1000
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">{siteConfig.name}</h1>
          <p className="text-muted-foreground">{siteConfig.description}</p>
        </div>

        {/* Fasting Timer Card */}
        <Card className="card-neumorph overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {fastingState.isFasting
                  ? "Jejum em andamento"
                  : "Pronto para começar?"}
              </h2>
              {currentPlan && (
                <span className="text-sm bg-fastsmart-purple/20 text-fastsmart-purple px-3 py-1 rounded-full">
                  {currentPlan.name}
                </span>
              )}
            </div>

            {fastingState.isFasting ? (
              <>
                <div className="text-center my-8">
                  <div className="text-4xl font-bold mb-2 tabular-nums">
                    {formattedTime}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatHoursLeft()}
                  </div>
                </div>

                <Progress value={fastingState.progress} className="h-2 mb-4" />

                <div className="flex justify-center">
                  <Button
                    variant="destructive"
                    onClick={endFast}
                    className="rounded-full px-8"
                  >
                    <Square className="mr-2 h-4 w-4" />
                    Encerrar Jejum
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center my-8">
                <div className="text-lg mb-4 text-muted-foreground">
                  {currentPlan
                    ? `Plano selecionado: ${currentPlan.name} (${currentPlan.fastHours}:${currentPlan.eatHours})`
                    : "Nenhum plano selecionado"}
                </div>

                <Button
                  onClick={handleStartFast}
                  size="lg"
                  className="rounded-full animate-pulse-ring px-8"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {currentPlan ? "Iniciar Jejum" : "Escolher Plano"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Water Tracking */}
        <Card className="glass-card overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Hidratação</h3>
              <span className="text-sm text-muted-foreground">
                Hoje: {waterLogs} copos
              </span>
            </div>

            <Button
              variant="outline"
              onClick={logWater}
              disabled={!canDrinkWater()}
              className="w-full h-14 relative overflow-hidden border-dashed bg-fastsmart-blue-light/10 hover:bg-fastsmart-blue-light/20 dark:bg-fastsmart-purple/10 dark:hover:bg-fastsmart-purple/20"
            >
              <DropletIcon className="mr-2 h-5 w-5 text-blue-500" />
              Registrar água
              {!canDrinkWater() && (
                <span className="text-xs block mt-1 text-muted-foreground">
                  Aguarde um momento para registrar novamente
                </span>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* AI Coach Tip */}
        <Card className="card-neumorph overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-fastsmart-purple to-fastsmart-blue-dark p-2 rounded-full">
                <BrainCircuit className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">AI Coach</h3>
                <p className="text-sm text-muted-foreground">{aiTip}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Education Link */}
        <Button
          variant="ghost"
          className="w-full justify-between"
          onClick={() => router.push("/education")}
        >
          <span>Benefícios do jejum intermitente</span>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </AppLayout>
  )
}

export default Dashboard
