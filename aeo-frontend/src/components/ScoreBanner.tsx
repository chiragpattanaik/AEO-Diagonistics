"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Trophy, XCircle, Zap } from "lucide-react"

interface ScoreBannerProps {
  rankedCount: number
  overallScore: string
  query: string
  targetBrand: string
}

export function ScoreBanner({ rankedCount, overallScore, query, targetBrand }: ScoreBannerProps) {
  const config =
    rankedCount === 3
      ? { icon: Trophy, color: "var(--success)" }
      : rankedCount === 2
        ? { icon: Zap, color: "var(--warning)" }
        : rankedCount === 1
          ? { icon: AlertTriangle, color: "var(--warning)" }
          : { icon: XCircle, color: "var(--danger)" }
  const Icon = config.icon

  return (
    <motion.section
      className="mx-auto flex max-w-[760px] overflow-hidden rounded-r-[24px]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="w-1.5 shrink-0" style={{ background: config.color }} />
      <div className="glass-card w-full rounded-l-none p-5 sm:px-6">
        <div className="flex items-center gap-3">
          <Icon className="size-5" style={{ color: config.color }} />
          <h2 className="display-font text-base font-bold text-[var(--text-primary)]">{overallScore}</h2>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-[var(--border-input)] bg-[rgba(230,255,248,0.06)] px-3 py-1 text-xs font-semibold text-[var(--text-label)]">
            {query}
          </span>
          <span className="rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-3 py-1 text-xs font-extrabold text-[var(--badge-text)]">
            {targetBrand}
          </span>
        </div>
      </div>
    </motion.section>
  )
}
