"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-2xl bg-[var(--background)]/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--cyan)] to-[var(--lime)] flex items-center justify-center shadow-lg shadow-[var(--cyan)]/30"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-5 h-5 text-black" />
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold bg-gradient-to-r from-[var(--cyan)] to-[var(--lime)] bg-clip-text text-transparent">
                AEO Diagnostic
              </span>
            </div>
            <div className="text-xs text-white/40">AI Brand Intelligence</div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
