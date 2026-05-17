import type { SuggestionResult } from "~/types"
import SuggestionItem from "./SuggestionItem"
import EmptyState from "./EmptyState"
import AddKeyButton from "./AddKeyButton"

interface SuggestionListProps {
  suggestions: SuggestionResult[]
  selectedIndex: number
  onFill: (index: number) => void
  onAddKey: () => void
}

export default function SuggestionList({
  suggestions,
  selectedIndex,
  onFill,
  onAddKey
}: SuggestionListProps) {
  if (suggestions.length === 0) {
    return (
      <>
        <EmptyState onAddKey={onAddKey} />
      </>
    )
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
      <AddKeyButton onClick={onAddKey} />
    </div>
  )
}
