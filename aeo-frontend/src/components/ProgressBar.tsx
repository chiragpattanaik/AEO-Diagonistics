"use client"

import { useScroll, useSpring, motion } from "framer-motion"

export function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--cyan)] via-[var(--lime)] to-[var(--cyan)] origin-left z-[60] shadow-lg shadow-[var(--cyan)]/50"
      style={{ scaleX }}
    />
  )
}
