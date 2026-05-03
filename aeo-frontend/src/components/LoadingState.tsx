"use client"

import { motion } from "framer-motion"

import { ClaudeLogo } from "@/components/ClaudeLogo"
import { GeminiLogo } from "@/components/GeminiLogo"
import { OpenAILogo } from "@/components/OpenAILogo"
import { cn } from "@/lib/utils"

const engines = [
  { key: "openai", icon: "OpenAI", label: "OpenAI" },
  { key: "claude", icon: "Claude", label: "Claude" },
  { key: "gemini", icon: "◆", label: "Gemini" },
]

export function LoadingState({ elapsedTime }: { elapsedTime: number }) {
  return (
    <motion.section
      className="mx-auto max-w-[480px] py-16 text-center"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <h2 className="display-font text-2xl font-bold text-[var(--text-primary)]">Querying AI engines...</h2>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        Running your query across 3 models simultaneously
      </p>

      <div className="mt-10 flex flex-col gap-3">
        {engines.map((engine, index) => (
          <motion.div
            key={engine.label}
            className="glass-card flex items-center justify-between px-5 py-3.5"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.35 }}
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-xl text-xl",
                  engine.key === "openai" ? "bg-[#F5FFF9] p-2 text-black" : "bg-transparent p-0"
                )}
              >
                <LoadingLogo engineKey={engine.key} fallback={engine.icon} />
              </span>
              <span className="text-sm font-medium text-[var(--text-primary)]">{engine.label}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="dot-1" />
              <span className="dot-2" />
              <span className="dot-3" />
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-center font-mono text-[13px] text-[var(--text-muted)]">
        Elapsed: {elapsedTime}s
      </p>
    </motion.section>
  )
}

function LoadingLogo({ engineKey, fallback }: { engineKey: string; fallback: string }) {
  if (engineKey === "openai") {
    return <OpenAILogo className="size-full" />
  }

  if (engineKey === "claude") {
    return <ClaudeLogo className="size-full" />
  }

  if (engineKey === "gemini") {
    return <GeminiLogo className="size-full" />
  }

  return fallback
}
