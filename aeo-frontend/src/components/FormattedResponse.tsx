import { Fragment } from "react"

interface FormattedResponseProps {
  text: string | null
  compact?: boolean
}

export function FormattedResponse({ text, compact = false }: FormattedResponseProps) {
  const normalized = normalizeResponse(text)

  if (normalized.length === 0) {
    return <span>No response body returned.</span>
  }

  return (
    <div className={compact ? "space-y-2" : "space-y-3.5"}>
      {normalized.map((line, index) => (
        <FormattedLine key={`${line}-${index}`} line={line} compact={compact} />
      ))}
    </div>
  )
}

function normalizeResponse(text: string | null) {
  return (text ?? "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^(\d+)\.\s+/, "$1. "))
}

function FormattedLine({ line, compact }: { line: string; compact: boolean }) {
  const headingMatch = line.match(/^#{1,3}\s+(.+)$/)
  const numberMatch = line.match(/^(\d+)\.\s+(.*)$/)

  if (headingMatch) {
    return (
      <h4 className="display-font text-sm font-bold leading-6 text-[var(--text-primary)]">
        {headingMatch[1]}
      </h4>
    )
  }

  if (numberMatch) {
    return (
      <p className={compact ? "flex gap-2.5 leading-relaxed" : "flex gap-3 leading-7"}>
        <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-[rgba(45,212,191,0.16)] text-xs font-extrabold text-[var(--success)] ring-1 ring-[rgba(94,234,212,0.2)]">
          {numberMatch[1]}
        </span>
        <span className="min-w-0 flex-1">{formatNumberedText(numberMatch[2])}</span>
      </p>
    )
  }

  return (
    <p className={compact ? "leading-relaxed" : "leading-7"}>
      {formatBold(line)}
    </p>
  )
}

function formatNumberedText(text: string) {
  const plainText = text.replace(/\*\*/g, "")
  const dashMatch = plainText.match(/^(.{2,90}?)(\s[-–]\s)(.+)$/)

  if (!dashMatch) {
    return formatBold(text)
  }

  return (
    <>
      <strong className="font-extrabold text-[var(--text-primary)]">{dashMatch[1]}</strong>
      <span>{dashMatch[2]}</span>
      <span>{formatBold(dashMatch[3])}</span>
    </>
  )
}

function formatBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${part}-${index}`} className="font-extrabold text-[var(--text-primary)]">
          {part.slice(2, -2)}
        </strong>
      )
    }

    return <Fragment key={`${part}-${index}`}>{part}</Fragment>
  })
}
