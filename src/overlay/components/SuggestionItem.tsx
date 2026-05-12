import type { SuggestionResult } from "~/types"

interface SuggestionItemProps {
  suggestion: SuggestionResult
  isSelected: boolean
  onClick: () => void
}

export default function SuggestionItem({
  suggestion,
  isSelected,
  onClick
}: SuggestionItemProps) {
  const displayValue = suggestion.entry.sensitive
    ? "••••••••"
    : suggestion.entry.value

  return (
    <button
      onClick={onClick}
      className={`w-full px-3 py-2 text-left flex flex-col gap-0.5 transition-colors ${
        isSelected
          ? "bg-blue-50 text-blue-900"
          : "bg-white text-gray-900 hover:bg-gray-50"
      }`}
    >
      <span className="text-sm font-medium">{suggestion.entry.key}</span>
      <span className="text-xs text-gray-500 truncate">{displayValue}</span>
    </button>
  )
}
