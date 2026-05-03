import type { SVGProps } from "react"

export function ClaudeLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <rect width="48" height="48" rx="10" fill="#D97757" />
      <g stroke="#FFF7ED" strokeLinecap="round" strokeWidth="4.2">
        <path d="M24 8v32" />
        <path d="M16.1 10.8 31.9 37.2" />
        <path d="M9.9 17 38.1 31" />
        <path d="M8 24h32" />
        <path d="M9.9 31 38.1 17" />
        <path d="M16.1 37.2 31.9 10.8" />
      </g>
    </svg>
  )
}
