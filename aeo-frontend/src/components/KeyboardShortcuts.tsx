"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Command, X } from "lucide-react"

const shortcuts = [
  { key: "Ctrl K", description: "Focus search bar" },
  { key: "Esc", description: "Reset analysis" },
  { key: "?", description: "Toggle shortcuts" },
]

export function KeyboardShortcuts({ onReset }: { onReset: () => void }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        document.querySelector<HTMLInputElement>("input")?.focus()
      }

      if (event.key === "Escape") {
        onReset()
      }

      if (event.key === "?" && event.shiftKey) {
        event.preventDefault()
        setIsVisible((current) => !current)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [onReset])

  return (
    <>
      <motion.button
        type="button"
        aria-label="Show keyboard shortcuts"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setIsVisible(true)}
        className="group fixed bottom-6 right-6 z-40 hidden size-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--lime)] shadow-2xl shadow-[var(--cyan)]/30 transition duration-300 hover:scale-110 md:flex"
      >
        <Command className="size-5 text-black transition duration-300 group-hover:rotate-12" />
      </motion.button>

      <AnimatePresence>
        {isVisible ? (
          <>
            <motion.button
              type="button"
              aria-label="Close keyboard shortcuts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVisible(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-8 shadow-2xl backdrop-blur-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="bg-gradient-to-r from-[var(--cyan)] to-[var(--lime)] bg-clip-text text-xl text-transparent">
                  Keyboard Shortcuts
                </h3>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setIsVisible(false)}
                  className="flex size-8 items-center justify-center rounded-lg bg-white/5 transition hover:bg-white/10"
                >
                  <X className="size-4 text-white/60" />
                </button>
              </div>

              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <motion.div
                    key={shortcut.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <span className="text-white/80">{shortcut.description}</span>
                    <kbd className="rounded-lg border border-white/20 bg-gradient-to-br from-white/10 to-white/5 px-3 py-1.5 font-mono text-xs text-[var(--cyan)]">
                      {shortcut.key}
                    </kbd>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}
