"use client"

import { FormEvent, useState } from "react"
import { motion } from "framer-motion"
import { Loader2, Search, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

interface QueryFormProps {
  onSubmit: (query: string, targetBrand: string) => void
  isLoading: boolean
}

const ease = [0.25, 0.46, 0.45, 0.94] as const

export function QueryForm({ onSubmit, isLoading }: QueryFormProps) {
  const [query, setQuery] = useState("")
  const [targetBrand, setTargetBrand] = useState("")
  const [errors, setErrors] = useState<{ query?: string; targetBrand?: string }>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: typeof errors = {}
    if (query.trim().length < 10) nextErrors.query = "Enter at least 10 characters."
    if (targetBrand.trim().length < 2) nextErrors.targetBrand = "Enter at least 2 characters."

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      onSubmit(query.trim(), targetBrand.trim())
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="group w-full max-w-6xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25, ease }}
    >
      <motion.div
        className="relative flex flex-col gap-3 rounded-[2rem] border border-[var(--card-border)] bg-[var(--input-background)] p-3 shadow-2xl shadow-[var(--cyan)]/10 backdrop-blur-2xl transition duration-300 hover:border-[var(--cyan)]/40 hover:shadow-[var(--cyan)]/30 lg:flex-row"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-[var(--cyan)]/5 to-[var(--lime)]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative flex min-w-0 flex-[1.2] items-center gap-4 px-4">
          <Search className="size-6 shrink-0 text-[var(--lime)] opacity-70" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Query (e.g. best sneakers)"
            aria-label="Search query"
            className="min-h-14 min-w-0 flex-1 border-0 bg-transparent text-base font-medium text-white placeholder:text-white/40 focus:shadow-none sm:text-lg"
          />
          <kbd className="hidden shrink-0 items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/40 md:flex">
            <span>Ctrl</span>
            <span>K</span>
          </kbd>
        </div>

        <div className="hidden w-px bg-gradient-to-b from-transparent via-white/20 to-transparent lg:block" />

        <div className="relative flex min-w-0 flex-1 items-center gap-4 px-4">
          <Sparkles className="size-6 shrink-0 animate-pulse text-[var(--cyan)] opacity-70" />
          <input
            value={targetBrand}
            onChange={(event) => setTargetBrand(event.target.value)}
            placeholder="Enter brand name"
            aria-label="Brand name"
            className="min-h-14 min-w-0 flex-1 border-0 bg-transparent text-base font-medium text-white placeholder:text-white/40 focus:shadow-none sm:text-lg"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="relative h-14 shrink-0 overflow-hidden rounded-3xl border-0 bg-gradient-to-r from-[var(--cyan)] to-[var(--lime)] px-10 text-base font-extrabold text-black transition duration-300 hover:shadow-lg hover:shadow-[var(--cyan)]/50 disabled:opacity-70 lg:min-w-48"
        >
          <span className="relative z-[1] flex items-center gap-2">
            {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
            <span>{isLoading ? "Analyzing" : "Analyze"}</span>
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-[var(--lime)] to-[var(--cyan)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Button>
      </motion.div>

      {(errors.query || errors.targetBrand) ? (
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-[var(--danger)]">
          {errors.targetBrand ? <span>{errors.targetBrand}</span> : null}
          {errors.query ? <span>{errors.query}</span> : null}
        </div>
      ) : null}
    </motion.form>
  )
}
