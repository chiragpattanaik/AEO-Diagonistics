"use client"

import { motion } from "framer-motion"
import { Award, Shield, TrendingUp, Zap } from "lucide-react"

const badges = [
  { icon: Shield, label: "100% Secure", description: "Enterprise-grade security" },
  { icon: Zap, label: "Real-time", description: "Live AI analysis" },
  { icon: Award, label: "Accurate", description: "97% confidence rate" },
  { icon: TrendingUp, label: "Trending", description: "Latest AI models" },
]

export function TrustBadges() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-4 lg:grid-cols-4"
    >
      {badges.map((badge, index) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + index * 0.1 }}
          className="group flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition duration-300 hover:border-[var(--cyan)]/30 hover:bg-white/10"
        >
          <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--cyan)]/20 to-[var(--lime)]/20 transition duration-300 group-hover:scale-110">
            <badge.icon className="size-6 text-[var(--cyan)]" />
          </div>
          <div className="mb-1 text-sm text-white/90">{badge.label}</div>
          <div className="text-xs text-white/50">{badge.description}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}
