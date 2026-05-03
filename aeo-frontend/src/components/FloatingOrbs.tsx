"use client"

import { motion } from "framer-motion"

export function FloatingOrbs() {
  return (
    <>
      <motion.div
        className="fixed top-20 left-10 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--cyan) 0%, transparent 70%)" }}
        animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed top-1/3 right-20 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--lime) 0%, transparent 70%)" }}
        animate={{ x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed bottom-1/4 left-1/3 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--purple) 0%, transparent 70%)" }}
        animate={{ x: [0, 30, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  )
}
