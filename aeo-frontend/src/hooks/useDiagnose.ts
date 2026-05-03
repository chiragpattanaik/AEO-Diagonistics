"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import type { AppState, DiagnoseResponse } from "@/types"

export function useDiagnose() {
  const [appState, setAppState] = useState<AppState>("idle")
  const [data, setData] = useState<DiagnoseResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [responseTime, setResponseTime] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const requestIdRef = useRef(0)
  const hasDiagnosticHistoryRef = useRef(false)

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const runDiagnose = useCallback(
    async (query: string, targetBrand: string) => {
      const requestId = requestIdRef.current + 1
      requestIdRef.current = requestId

      if (typeof window !== "undefined" && !hasDiagnosticHistoryRef.current) {
        window.history.pushState({ aeoDiagnostic: true }, "", window.location.href)
        hasDiagnosticHistoryRef.current = true
      }

      clearTimer()
      setAppState("loading")
      setData(null)
      setError(null)
      setElapsedTime(0)
      setResponseTime(0)

      const startTime = Date.now()
      intervalRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)

      try {
        const response = await fetch("/diagnose", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query, targetBrand }),
        })

        if (!response.ok) {
          const message = await response.text()
          throw new Error(message || `Diagnostic failed with status ${response.status}`)
        }

        const result = (await response.json()) as DiagnoseResponse
        if (requestIdRef.current !== requestId) return

        clearTimer()
        setResponseTime(Date.now() - startTime)
        setData(result)
        setAppState("results")
      } catch (caughtError) {
        if (requestIdRef.current !== requestId) return

        clearTimer()
        setResponseTime(Date.now() - startTime)
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Something went wrong while running the diagnostic."
        )
        setAppState("error")
      }
    },
    [clearTimer]
  )

  const reset = useCallback(() => {
    requestIdRef.current += 1
    clearTimer()
    setAppState("idle")
    setData(null)
    setError(null)
    setElapsedTime(0)
    setResponseTime(0)
  }, [clearTimer])

  useEffect(() => {
    function handlePopState() {
      reset()
      hasDiagnosticHistoryRef.current = false
    }

    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) {
        reset()
        hasDiagnosticHistoryRef.current = false
      }
    }

    window.addEventListener("popstate", handlePopState)
    window.addEventListener("pageshow", handlePageShow)

    return () => {
      window.removeEventListener("popstate", handlePopState)
      window.removeEventListener("pageshow", handlePageShow)
    }
  }, [reset])

  return { appState, data, error, elapsedTime, responseTime, runDiagnose, reset }
}
