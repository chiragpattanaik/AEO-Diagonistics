"use client"

import { useEffect, useRef } from "react"

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const canvasElement = canvas
    const drawingContext = context

    let animationFrame = 0
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }))

    function resize() {
      canvasElement.width = window.innerWidth
      canvasElement.height = window.innerHeight
    }

    function animate() {
      drawingContext.clearRect(0, 0, canvasElement.width, canvasElement.height)

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvasElement.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvasElement.height) particle.vy *= -1

        drawingContext.beginPath()
        drawingContext.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        drawingContext.fillStyle = `rgba(0, 245, 233, ${particle.opacity})`
        drawingContext.fill()

        particles.forEach((other, otherIndex) => {
          if (index === otherIndex) return
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          if (distance >= 120) return

          drawingContext.beginPath()
          drawingContext.moveTo(particle.x, particle.y)
          drawingContext.lineTo(other.x, other.y)
          drawingContext.strokeStyle = `rgba(0, 245, 233, ${0.1 * (1 - distance / 120)})`
          drawingContext.lineWidth = 0.5
          drawingContext.stroke()
        })
      })

      animationFrame = requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" />
}
