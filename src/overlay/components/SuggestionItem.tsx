import type { SuggestionResult } from "~/types"

interface SuggestionItemProps {
  suggestion: SuggestionResult
  isSelected: boolean
  onFill: () => void
}

export default function SuggestionItem({
  suggestion,
  isSelected,
  onFill
}: SuggestionItemProps) {
  const displayValue = suggestion.entry.sensitive
    ? "••••••••"
    : suggestion.entry.value

  return (
    <button
      onClick={onFill}
      role="option"
      aria-selected={isSelected}
      style={{
        width: "100%",
        padding: "5px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "13px",
        border: "none",
        cursor: "pointer",
        textAlign: "left" as const,
        background: isSelected ? "rgba(6, 78, 59, 0.5)" : "transparent",
        color: "#fff",
        boxSizing: "border-box" as const
      }}
      onMouseEnter={(e) => {
        if (!isSelected) e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
      }}
      onMouseLeave={(e) => {
        if (!isSelected) e.currentTarget.style.background = "transparent"
      }}
    >
      <span
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap" as const,
          fontWeight: 500
        }}
      >
        {suggestion.entry.key}
      </span>
      <span
        style={{
          marginLeft: "12px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap" as const,
          maxWidth: "50%",
          color: "rgba(255, 255, 255, 0.65)"
        }}
      >
        {displayValue}
      </span>
    </button>
  )
}
