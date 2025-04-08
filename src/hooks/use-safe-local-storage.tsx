"use client"
import { useEffect, useState } from "react"

export function useSafeLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)

  useEffect(() => {
    const stored = localStorage.getItem(key)
    setValue(stored ? JSON.parse(stored) : initialValue)
  }, [key, initialValue])

  const setSafeValue = (value: T) => {
    setValue(value)
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  return [value, setSafeValue] as const
}
