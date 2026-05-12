import { useOverlayStore } from "~/state/overlay-store"
import { useSearchStore } from "~/state/search-store"
import SearchBar from "../components/SearchBar"
import SuggestionList from "../components/SuggestionList"

export default function OverlayContainer() {
  const isOpen = useOverlayStore((s) => s.isOpen)
  const top = useOverlayStore((s) => s.top)
  const left = useOverlayStore((s) => s.left)
  const selectedIndex = useOverlayStore((s) => s.selectedIndex)
  const close = useOverlayStore((s) => s.close)
  const setSelectedIndex = useOverlayStore((s) => s.setSelectedIndex)

  const query = useSearchStore((s) => s.query)
  const results = useSearchStore((s) => s.results)
  const setQuery = useSearchStore((s) => s.setQuery)

  if (!isOpen) return null

  return (
    <div
      className="fixed z-[2147483647] w-72 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
      style={{ top, left }}
    >
      <SearchBar value={query} onChange={setQuery} />
      <SuggestionList
        suggestions={results}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />
    </div>
  )
}
