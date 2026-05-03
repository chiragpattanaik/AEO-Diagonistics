"use client"

import { useState } from "react"
import { Check, Copy, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { buildReport, copyText } from "@/lib/utils"
import type { DiagnoseResponse } from "@/types"

export function ActionBar({ data, onReset }: { data: DiagnoseResponse; onReset: () => void }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await copyText(buildReport(data))
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  function handleReset() {
    onReset()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
      <Button
        type="button"
        variant="outline"
        onClick={handleReset}
        className="h-12 gap-2 rounded-2xl border border-[var(--border-input)] bg-[rgba(230,255,248,0.045)] px-6 text-sm font-bold text-[var(--text-secondary)] hover:-translate-y-0.5 hover:border-[rgba(45,212,191,0.42)] hover:bg-[rgba(45,212,191,0.08)]"
      >
        <RotateCcw className="size-4" />
        Run another query
      </Button>
      <Button
        type="button"
        variant="secondary"
        onClick={handleCopy}
        className="h-12 gap-2 rounded-2xl border border-[rgba(45,212,191,0.34)] bg-[rgba(45,212,191,0.07)] px-6 text-sm font-bold text-[var(--text-primary)] hover:-translate-y-0.5 hover:border-[rgba(163,230,53,0.48)] hover:bg-[rgba(45,212,191,0.12)]"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? "Copied!" : "Copy Report"}
      </Button>
    </section>
  )
}
