"use client"

import { motion } from "framer-motion"
import { Cpu, Zap } from "lucide-react"

const pills = [
  { icon: Cpu, label: "3 AI Engines", color: "var(--cyan)" },
  { icon: Zap, label: "Real-time", color: "var(--lime)" },
]

export function StatusPills() {
  return (
    <div className="flex flex-wrap items-center gap-4 pt-1">
      {pills.map((pill, index) => (
        <motion.div
          key={pill.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 shadow-lg backdrop-blur-xl transition duration-300 hover:border-white/20 hover:bg-white/10"
        >
          <pill.icon className="size-4.5" style={{ color: pill.color }} />
          <span className="text-base text-white/80">{pill.label}</span>
        </motion.div>
      ))}
    </div>
  )
}
