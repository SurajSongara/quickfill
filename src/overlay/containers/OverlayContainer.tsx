import { useOverlayStore } from "~/state/overlay-store"
import { useSearchStore } from "~/state/search-store"
import { fillInputValue } from "~/dom"
import SearchBar from "../components/SearchBar"
import SuggestionList from "../components/SuggestionList"

export default function OverlayContainer() {
  const isOpen = useOverlayStore((s) => s.isOpen)
  const top = useOverlayStore((s) => s.top)
  const left = useOverlayStore((s) => s.left)
  const width = useOverlayStore((s) => s.width)
  const selectedIndex = useOverlayStore((s) => s.selectedIndex)
  const close = useOverlayStore((s) => s.close)
  const activeElement = useOverlayStore((s) => s.activeElement)

  const query = useSearchStore((s) => s.query)
  const results = useSearchStore((s) => s.results)
  const setQuery = useSearchStore((s) => s.setQuery)

  if (!isOpen) return null

  const handleFill = (index: number) => {
    const entry = results[index]?.entry
    if (entry && activeElement) {
      fillInputValue(
        activeElement as HTMLInputElement | HTMLTextAreaElement,
        entry.value
      )
    }
    close()
  }

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 2147483647,
        background: "rgba(16, 185, 129, 0.65)",
        borderRadius: "10px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
        border: "2px solid rgba(255, 255, 255, 0.75)",
        overflow: "hidden",
        animation: "qfFadeSlideIn 0.2s ease-out",
        top,
        left,
        width,
        backdropFilter: "blur(4px)"
      }}
    >
      <SearchBar value={query} onChange={setQuery} />
      <SuggestionList
        suggestions={results}
        selectedIndex={selectedIndex}
        onFill={handleFill}
      />
    </div>
  )
}
