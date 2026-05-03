"use client"

import { motion } from "framer-motion"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ClaudeLogo } from "@/components/ClaudeLogo"
import { FormattedResponse } from "@/components/FormattedResponse"
import { GeminiLogo } from "@/components/GeminiLogo"
import { OpenAILogo } from "@/components/OpenAILogo"
import { cn, formatSeconds } from "@/lib/utils"
import type { EngineConfig, EngineResult } from "@/types"

interface EngineCardProps {
  engine: EngineConfig
  result: EngineResult
  responseTime: number
  index: number
  targetBrand: string
}

const ease = [0.25, 0.46, 0.45, 0.94] as const

export function EngineCard({ engine, result, responseTime, index }: EngineCardProps) {
  return (
    <motion.article
      className="glass-card group flex h-full min-h-[420px] flex-col gap-5 p-6"
      style={{ borderTopColor: engine.accentColor }}
      initial={{ opacity: 0, y: 32, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: index * 0.15, ease }}
    >
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex size-10 items-center justify-center rounded-2xl text-[22px] transition duration-300 group-hover:scale-105 group-hover:rotate-2",
              engine.key === "gpt4" ? "bg-[#F5FFF9] p-2 text-black" : "bg-transparent p-0"
            )}
            style={engine.key === "gpt4" ? undefined : { color: engine.color }}
          >
            <EngineLogo engine={engine} />
          </span>
          <h3 className="display-font text-base font-bold text-[var(--text-primary)]">{engine.label}</h3>
        </div>
        <span className="font-mono text-xs text-[var(--text-muted)]">
          ~{formatSeconds(responseTime)}
        </span>
      </header>

      <div className="flex-1">
        {result.error ? (
          <ErrorContent message={result.fullResponse} />
        ) : result.ranked ? (
          <RankedContent position={result.position} mention={result.mention} />
        ) : (
          <NotRankedContent engineLabel={engine.label} />
        )}
      </div>

      <footer className="mt-auto border-t border-[rgba(255,255,255,0.06)] pt-4">
        <Accordion>
          <AccordionItem value={`${engine.key}-response`} className="border-0">
            <AccordionTrigger className="rounded-2xl px-3 py-3 text-sm font-semibold text-[var(--text-muted)] transition hover:bg-white/[0.03] hover:text-[var(--text-primary)] hover:no-underline focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]/70">
              View full response
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <div className="response-panel response-scroll max-h-[340px] overflow-auto rounded-2xl border border-[rgba(188,255,236,0.13)] bg-[rgba(3,10,13,0.58)] p-5 pr-6 text-left text-sm text-[var(--text-secondary)] shadow-inner shadow-black/30">
                <FormattedResponse text={result.fullResponse} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </footer>
    </motion.article>
  )
}

function EngineLogo({ engine }: { engine: EngineConfig }) {
  if (engine.key === "gpt4") {
    return <OpenAILogo className="size-full" />
  }

  if (engine.key === "claude") {
    return <ClaudeLogo className="size-full" />
  }

  if (engine.key === "gemini") {
    return <GeminiLogo className="size-full" />
  }

  return engine.icon
}

function RankedContent({ position, mention }: { position: number | null; mention: string | null }) {
  return (
    <div>
      <div className="inline-flex items-center gap-3 rounded-2xl border border-[var(--success-border)] bg-[var(--success-bg)] px-4 py-2 shadow-[0_0_30px_rgba(45,212,191,0.08)]">
        <span className="display-font text-xl font-extrabold text-[var(--success)]">#{position}</span>
        <span className="text-[10px] font-semibold uppercase text-[var(--success)]">Ranked</span>
      </div>
      <p className="mt-4 text-[10px] font-semibold uppercase text-[var(--text-muted)]">
        What the AI said:
      </p>
      <blockquote className="mt-2 rounded-r-2xl border-l-2 border-[rgba(45,212,191,0.52)] bg-[rgba(45,212,191,0.055)] px-3.5 py-3 text-[13px] text-[var(--text-secondary)]">
        <FormattedResponse text={mention} compact />
      </blockquote>
    </div>
  )
}

function NotRankedContent({ engineLabel }: { engineLabel: string }) {
  return (
    <div>
      <div className="inline-flex items-center rounded-2xl border border-[var(--danger-border)] bg-[var(--danger-bg)] px-4 py-2">
        <span className="text-sm font-extrabold uppercase text-[var(--danger)]">Not ranked</span>
      </div>
      <p className="mt-3 text-[13px] text-[var(--text-secondary)]">
        {engineLabel} did not mention your brand in its top recommendations.
      </p>
      <p className="mt-2 text-xs italic text-[var(--text-muted)]">
        Consider optimizing your listing copy for this query type.
      </p>
    </div>
  )
}

function ErrorContent({ message }: { message: string }) {
  return (
    <div>
      <div className="inline-flex items-center rounded-2xl border border-[var(--warning-border)] bg-[var(--warning-bg)] px-4 py-2">
        <span className="text-sm font-extrabold uppercase text-[var(--warning)]">API error</span>
      </div>
      <p className="mt-3 text-xs text-[var(--text-muted)]">
        {message || "This engine returned an error during the diagnostic."}
      </p>
    </div>
  )
}
