"use client"

import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, RotateCcw } from "lucide-react"

import { ActionBar } from "@/components/ActionBar"
import { Footer } from "@/components/Footer"
import { FloatingOrbs } from "@/components/FloatingOrbs"
import { GlowCursor } from "@/components/GlowCursor"
import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts"
import { LoadingState } from "@/components/LoadingState"
import { ParticleField } from "@/components/ParticleField"
import { ProgressBar } from "@/components/ProgressBar"
import { QueryForm } from "@/components/QueryForm"
import { ResultsGrid } from "@/components/ResultsGrid"
import { ScoreBanner } from "@/components/ScoreBanner"
import { StatusPills } from "@/components/StatusPills"
import { Button } from "@/components/ui/button"
import { useDiagnose } from "@/hooks/useDiagnose"

export default function Home() {
  const { appState, data, error, elapsedTime, responseTime, runDiagnose, reset } = useDiagnose()

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[var(--background)]">
      <ProgressBar />
      <Header />
      <GlowCursor />
      <ParticleField />
      <FloatingOrbs />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,245,233,0.1),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(180,255,57,0.08),transparent_50%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <main className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-10 pt-24 sm:px-8 sm:pb-12 sm:pt-24">
        <div className="mb-8 sm:mb-10 xl:mb-12">
          <HeroSection />
        </div>

        <AnimatePresence mode="wait">
          {appState === "idle" ? (
            <motion.div key="idle" className="flex flex-col items-start gap-6" exit={{ opacity: 0, y: -12 }}>
              <QueryForm onSubmit={runDiagnose} isLoading={false} />
              <StatusPills />
            </motion.div>
          ) : null}

          {appState === "loading" ? (
            <motion.div key="loading" exit={{ opacity: 0, y: -12 }}>
              <LoadingState elapsedTime={elapsedTime} />
            </motion.div>
          ) : null}

          {appState === "results" && data ? (
            <motion.div key="results" className="space-y-4" exit={{ opacity: 0, y: -12 }}>
              <ScoreBanner
                rankedCount={data.rankedCount}
                overallScore={data.overallScore}
                query={data.query}
                targetBrand={data.targetBrand}
              />
              <ResultsGrid data={data} responseTime={responseTime} />
              <ActionBar data={data} onReset={reset} />
            </motion.div>
          ) : null}

          {appState === "error" ? (
            <motion.section
              key="error"
              className="glass-card mx-auto max-w-[680px] p-6 sm:p-7"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <div className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--danger-bg)] text-[var(--danger)]">
                  <AlertCircle className="size-5" />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">Diagnostic failed</h2>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    {error || "The API did not return a successful response."}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                onClick={reset}
                className="cta-gradient mt-6 h-12 gap-2 rounded-xl border-0 px-5 font-bold text-[#031211] hover:-translate-y-0.5"
              >
                <RotateCcw className="size-4" />
                Try again
              </Button>
            </motion.section>
          ) : null}
        </AnimatePresence>
      </main>
      <KeyboardShortcuts onReset={reset} />
      <Footer />
    </div>
  )
}
