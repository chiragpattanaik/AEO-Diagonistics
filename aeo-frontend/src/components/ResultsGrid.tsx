"use client"

import { EngineCard } from "@/components/EngineCard"
import type { DiagnoseResponse, EngineConfig, EngineResult } from "@/types"

const ENGINE_CONFIGS: EngineConfig[] = [
  {
    key: "gpt4",
    label: "OpenAI",
    icon: "OpenAI",
    color: "#10A37F",
    accentColor: "rgba(16,163,127,0.5)",
  },
  {
    key: "claude",
    label: "Claude",
    icon: "*",
    color: "#FBBF24",
    accentColor: "rgba(251,191,36,0.5)",
  },
  {
    key: "gemini",
    label: "Gemini",
    icon: "Gemini",
    color: "#67E8F9",
    accentColor: "rgba(103,232,249,0.5)",
  },
]

function missingResult(engine: EngineConfig): EngineResult {
  return {
    ranked: false,
    position: null,
    mention: null,
    fullResponse: `${engine.label} was not included in the API response.`,
    error: true,
  }
}

export function ResultsGrid({
  data,
  responseTime,
}: {
  data: DiagnoseResponse
  responseTime: number
}) {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {ENGINE_CONFIGS.map((engine, index) => (
        <div key={engine.key} className="md:last:col-span-2 lg:last:col-span-1">
          <EngineCard
            engine={engine}
            result={data.results[engine.key] ?? missingResult(engine)}
            responseTime={responseTime}
            index={index}
            targetBrand={data.targetBrand}
          />
        </div>
      ))}
    </section>
  )
}
