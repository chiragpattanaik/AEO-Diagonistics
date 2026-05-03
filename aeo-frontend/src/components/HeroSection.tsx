"use client"

import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="w-full max-w-5xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 inline-block max-w-full rounded-full border border-[var(--cyan)]/20 bg-gradient-to-r from-[var(--cyan)]/10 to-[var(--lime)]/10 px-5 py-2.5 backdrop-blur-xl sm:mb-7"
      >
        <span className="text-sm font-medium text-[var(--cyan)]">AI Brand Intelligence Platform</span>
      </motion.div>

      <h1 className="mb-6 max-w-full leading-[1.06] tracking-tight sm:mb-7">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="display-font block text-[clamp(2.8rem,11.5vw,5rem)] text-white/90 sm:text-7xl lg:text-8xl xl:text-[6.75rem]"
        >
          Find out if
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="display-font animate-gradient block max-w-full bg-gradient-to-r from-[var(--cyan)] via-[var(--lime)] to-[var(--cyan)] bg-[length:200%_auto] bg-clip-text text-[clamp(2.45rem,9.4vw,4.3rem)] text-transparent sm:text-7xl lg:text-8xl xl:text-[6.75rem]"
        >
          AI recommends
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="display-font block text-[clamp(2.8rem,11.5vw,5rem)] text-white/90 sm:text-7xl lg:text-8xl xl:text-[6.75rem]"
        >
          your brand.
        </motion.span>
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-3xl text-lg leading-relaxed text-white/60 sm:text-2xl"
      >
        Discover how leading AI engines rank your brand in real time across search queries.
      </motion.p>
    </section>
  )
}
