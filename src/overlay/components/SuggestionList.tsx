import type { SuggestionResult } from "~/types"
import SuggestionItem from "./SuggestionItem"
import EmptyState from "./EmptyState"

interface SuggestionListProps {
  suggestions: SuggestionResult[]
  selectedIndex: number
  onSelect: (index: number) => void
}

export default function SuggestionList({
  suggestions,
  selectedIndex,
  onSelect
}: SuggestionListProps) {
  if (suggestions.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="py-1">
      {suggestions.map((suggestion, index) => (
        <SuggestionItem
          key={suggestion.entry.id}
          suggestion={suggestion}
          isSelected={index === selectedIndex}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  )
}
