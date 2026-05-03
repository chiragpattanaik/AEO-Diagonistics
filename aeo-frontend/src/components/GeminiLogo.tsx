import type { SVGProps } from "react"

export function GeminiLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="gemini-gradient" x1="8" x2="40" y1="40" y2="8">
          <stop offset="0" stopColor="#1A73E8" />
          <stop offset="0.45" stopColor="#38BDF8" />
          <stop offset="0.72" stopColor="#A78BFA" />
          <stop offset="1" stopColor="#FB7185" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="10" fill="#030712" />
      <path
        d="M24 6c2.3 10 8 15.7 18 18-10 2.3-15.7 8-18 18-2.3-10-8-15.7-18-18 10-2.3 15.7-8 18-18Z"
        fill="url(#gemini-gradient)"
      />
      <path
        d="M24 10.5c1.7 7.5 6 11.8 13.5 13.5C30 25.7 25.7 30 24 37.5 22.3 30 18 25.7 10.5 24 18 22.3 22.3 18 24 10.5Z"
        fill="rgba(255,255,255,0.18)"
      />
    </svg>
  )
}
