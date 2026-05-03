export interface EngineResult {
  ranked: boolean
  position: number | null
  mention: string | null
  fullResponse: string
  error: boolean
}

export interface DiagnoseResponse {
  query: string
  targetBrand: string
  overallScore: string
  rankedCount: number
  results: {
    gpt4: EngineResult
    claude: EngineResult
    gemini: EngineResult
  }
}

export type AppState = "idle" | "loading" | "results" | "error"

export interface EngineConfig {
  key: "gpt4" | "claude" | "gemini"
  label: string
  icon: string
  color: string
  accentColor: string
}
