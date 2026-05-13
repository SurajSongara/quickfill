import type { SuggestionResult } from "~/types"
import SuggestionItem from "./SuggestionItem"
import EmptyState from "./EmptyState"

interface SuggestionListProps {
  suggestions: SuggestionResult[]
  selectedIndex: number
  onFill: (index: number) => void
}

export default function SuggestionList({
  suggestions,
  selectedIndex,
  onFill
}: SuggestionListProps) {
  if (suggestions.length === 0) {
    return <EmptyState />
  }

  return (
    <div>
      {suggestions.map((suggestion, index) => (
        <SuggestionItem
          key={suggestion.entry.id}
          suggestion={suggestion}
          isSelected={index === selectedIndex}
          onFill={() => onFill(index)}
        />
      ))}
    </div>
  )
}
