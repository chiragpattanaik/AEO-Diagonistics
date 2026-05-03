"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function GlowCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      setMousePosition({ x: event.clientX, y: event.clientY })
      setIsVisible(true)
    }

    function handleMouseLeave() {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50"
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute size-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,245,233,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ x: mousePosition.x - 192, y: mousePosition.y - 192 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      />
    </motion.div>
  )
}
