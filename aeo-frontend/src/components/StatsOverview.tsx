"use client"

import { motion } from "framer-motion"
import { BarChart3, Target, TrendingUp, Zap } from "lucide-react"

const stats = [
  { label: "Queries Today", value: "2,847", change: "+12.5%", icon: BarChart3 },
  { label: "Avg Response", value: "1.2s", change: "-0.3s", icon: Zap },
  { label: "Accuracy Rate", value: "97.8%", change: "+2.1%", icon: Target },
  { label: "Active Users", value: "18.2k", change: "+8.4%", icon: TrendingUp },
]

export function StatsOverview() {
  return (
    <div className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index, type: "spring" }}
          whileHover={{ y: -4, scale: 1.02 }}
          className="group cursor-default rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-5 backdrop-blur-xl transition duration-300 hover:border-[var(--cyan)]/30"
        >
          <div className="mb-3 flex items-start justify-between">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--cyan)]/10 to-[var(--lime)]/10 transition duration-300 group-hover:scale-110">
              <stat.icon className="size-5 text-[var(--cyan)]" />
            </div>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-400">
              {stat.change}
            </span>
          </div>
          <div className="mb-1 bg-gradient-to-r from-white to-white/70 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
            {stat.value}
          </div>
          <div className="text-xs text-white/50">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
