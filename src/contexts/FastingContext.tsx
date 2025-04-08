"use client"
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react"
import { toast } from "@/components/ui/use-toast"

type FastingPlan = {
  id: string
  name: string
  fastHours: number
  eatHours: number
  description: string
  benefits: string[]
}

type FastingState = {
  isFasting: boolean
  currentPlan: FastingPlan | null
  startTime: Date | null
  endTime: Date | null
  progress: number
  remainingTime: number // in seconds
}

type FastingContextType = {
  plans: FastingPlan[]
  fastingState: FastingState
  startFast: (planId: string) => void
  endFast: () => void
  selectPlan: (planId: string) => void
  currentPlan: FastingPlan | null
  formattedTime: string
  waterLogs: number
  logWater: () => void
  lastWaterLog: Date | null
}

const defaultPlans: FastingPlan[] = [
  {
    id: "16-8",
    name: "16:8",
    fastHours: 16,
    eatHours: 8,
    description:
      "O clássico protocolo de 16 horas de jejum e 8 horas de alimentação",
    benefits: [
      "Melhora sensibilidade à insulina",
      "Promove autofagia",
      "Fácil de incorporar no dia-a-dia",
    ],
  },
  {
    id: "18-6",
    name: "18:6",
    fastHours: 18,
    eatHours: 6,
    description:
      "Um jejum mais avançado com 18 horas de jejum e 6 horas de alimentação",
    benefits: [
      "Queima de gordura acelerada",
      "Maior autofagia",
      "Clareza mental aumentada",
    ],
  },
  {
    id: "20-4",
    name: "20:4",
    fastHours: 20,
    eatHours: 4,
    description:
      "Protocolo avançado com 20 horas de jejum e 4 horas de alimentação",
    benefits: [
      "Autofagia profunda",
      "Queima de gordura maximizada",
      "Ideal para pessoas adaptadas ao jejum",
    ],
  },
  {
    id: "omad",
    name: "OMAD",
    fastHours: 23,
    eatHours: 1,
    description: "Uma refeição por dia, consumida em um período de 1 hora",
    benefits: [
      "Máxima autofagia",
      "Simplifica o planejamento alimentar",
      "Para praticantes experientes",
    ],
  },
]

const initialFastingState: FastingState = {
  isFasting: false,
  currentPlan: null,
  startTime: null,
  endTime: null,
  progress: 0,
  remainingTime: 0,
}

export const FastingContext = createContext<FastingContextType>({
  plans: defaultPlans,
  fastingState: initialFastingState,
  startFast: () => {},
  endFast: () => {},
  selectPlan: () => {},
  currentPlan: null,
  formattedTime: "00:00:00",
  waterLogs: 0,
  logWater: () => {},
  lastWaterLog: null,
})

export const useFasting = () => {
  return useContext(FastingContext)
}

export const FastingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isClient, setIsClient] = useState(false)
  const [plans] = useState<FastingPlan[]>(defaultPlans)
  const [fastingState, setFastingState] = useState<FastingState>(() => {
    if (typeof window === "undefined") return initialFastingState

    const savedState = localStorage.getItem("fastingState")
    if (savedState) {
      const parsedState = JSON.parse(savedState)
      return {
        ...parsedState,
        startTime: parsedState.startTime
          ? new Date(parsedState.startTime)
          : null,
        endTime: parsedState.endTime ? new Date(parsedState.endTime) : null,
      }
    }
    return initialFastingState
  })

  const [formattedTime, setFormattedTime] = useState<string>("00:00:00")
  const [waterLogs, setWaterLogs] = useState<number>(() => {
    if (typeof window === "undefined") return 0
    const savedWaterLogs = localStorage.getItem("waterLogs")
    return savedWaterLogs ? parseInt(savedWaterLogs) : 0
  })
  const [lastWaterLog, setLastWaterLog] = useState<Date | null>(() => {
    if (typeof window === "undefined") return null
    const saved = localStorage.getItem("lastWaterLog")
    return saved ? new Date(saved) : null
  })

  const selectPlan = (planId: string) => {
    const plan = plans.find((p) => p.id === planId) || null
    setFastingState((prev) => ({
      ...prev,
      currentPlan: plan,
    }))
  }

  const startFast = (planId: string) => {
    const plan = plans.find((p) => p.id === planId)
    if (!plan) return

    const startTime = new Date()
    const endTime = new Date(
      startTime.getTime() + plan.fastHours * 60 * 60 * 1000
    )

    setFastingState({
      isFasting: true,
      currentPlan: plan,
      startTime,
      endTime,
      progress: 0,
      remainingTime: plan.fastHours * 60 * 60,
    })

    toast({
      title: "Jejum iniciado!",
      description: `Você iniciou um jejum de ${plan.fastHours} horas. Boa sorte!`,
    })
  }

  const endFast = useCallback(() => {
    if (!fastingState.isFasting) return

    const elapsedTime = fastingState.startTime
      ? Math.floor((Date.now() - fastingState.startTime.getTime()) / 1000)
      : 0

    const hours = Math.floor(elapsedTime / 3600)

    setFastingState({
      ...initialFastingState,
      currentPlan: fastingState.currentPlan,
    })

    toast({
      title: "Jejum finalizado!",
      description: `Você completou ${hours} horas de jejum. Parabéns!`,
    })
  }, [fastingState.isFasting, fastingState.startTime, fastingState.currentPlan])

  const logWater = () => {
    setWaterLogs((prev) => prev + 1)
    setLastWaterLog(new Date())

    toast({
      title: "Hidratação registrada!",
      description: "Lembre-se de manter-se bem hidratado durante o jejum.",
    })
  }

  // Format the remaining time for display
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    return [hours, minutes, secs]
      .map((val) => val.toString().padStart(2, "0"))
      .join(":")
  }

  // Update the timer every second when fasting
  useEffect(() => {
    let timerId: number

    if (
      fastingState.isFasting &&
      fastingState.startTime &&
      fastingState.endTime
    ) {
      timerId = window.setInterval(() => {
        const now = new Date()
        const elapsedTime = Math.floor(
          (now.getTime() - fastingState.startTime!.getTime()) / 1000
        )
        const totalDuration = fastingState.currentPlan!.fastHours * 60 * 60
        const remainingTime = Math.max(0, totalDuration - elapsedTime)
        const progress = Math.min(100, (elapsedTime / totalDuration) * 100)

        setFormattedTime(formatTime(elapsedTime))

        setFastingState((prev) => ({
          ...prev,
          progress,
          remainingTime,
        }))

        // End the fast automatically when time is up
        if (remainingTime <= 0) {
          endFast()
          toast({
            title: "Jejum completo!",
            description: `Você completou com sucesso seu jejum de ${
              fastingState.currentPlan!.fastHours
            } horas!`,
          })
        }

        // Hydration reminder every 2 hours
        if (elapsedTime > 0 && elapsedTime % 7200 === 0) {
          toast({
            title: "Lembrete de hidratação",
            description:
              "Já faz 2 horas desde seu último registro de água. Lembre-se de se manter hidratado!",
          })
        }
      }, 1000)
    } else {
      setFormattedTime("00:00:00")
    }

    return () => {
      if (timerId) clearInterval(timerId)
    }
  }, [
    endFast,
    fastingState.currentPlan,
    fastingState.endTime,
    fastingState.isFasting,
    fastingState.startTime,
  ])

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem(
      "fastingState",
      JSON.stringify({
        ...fastingState,
        startTime: fastingState.startTime
          ? fastingState.startTime.toISOString()
          : null,
        endTime: fastingState.endTime
          ? fastingState.endTime.toISOString()
          : null,
      })
    )
  }, [fastingState])

  useEffect(() => {
    localStorage.setItem("waterLogs", waterLogs.toString())
  }, [waterLogs])

  useEffect(() => {
    if (lastWaterLog) {
      localStorage.setItem("lastWaterLog", lastWaterLog.toISOString())
    }
  }, [lastWaterLog])

  useEffect(() => {
    setIsClient(true)
    // Qualquer acesso ao localStorage aqui
  }, [])

  if (!isClient) return null

  return (
    <FastingContext.Provider
      value={{
        plans,
        fastingState,
        startFast,
        endFast,
        selectPlan,
        currentPlan: fastingState.currentPlan,
        formattedTime,
        waterLogs,
        logWater,
        lastWaterLog,
      }}
    >
      {children}
    </FastingContext.Provider>
  )
}
