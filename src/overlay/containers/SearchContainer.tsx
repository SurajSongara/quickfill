import { useEffect } from "react"
import { useSearchStore } from "~/state/search-store"
import { useVaultStore } from "~/state/vault-store"
import { useOverlayStore } from "~/state/overlay-store"
import { getTopSuggestions } from "~/matcher"
import { extractFieldContext } from "~/dom"
import type { SuggestionResult } from "~/types"
import { MatchKind } from "~/types"

export default function SearchContainer() {
  const query = useSearchStore((s) => s.query)
  const setResults = useSearchStore((s) => s.setResults)
  const setSearching = useSearchStore((s) => s.setSearching)
  const entries = useVaultStore((s) => s.entries)
  const fetchAll = useVaultStore((s) => s.fetchAll)
  const activeElement = useOverlayStore((s) => s.activeElement)
  const setSelectedIndex = useOverlayStore((s) => s.setSelectedIndex)
  const isLoading = useVaultStore((s) => s.isLoading)

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  useEffect(() => {
    if (!query && activeElement) {
      const ctx = extractFieldContext(activeElement)
      if (ctx) {
        const suggestions = getTopSuggestions(ctx, entries)
        setResults(suggestions)
        setSelectedIndex(0)
        return
      }
    }

    if (query) {
      setSearching(true)
      const filtered: SuggestionResult[] = entries
        .filter((e) =>
          e.key.toLowerCase().includes(query.toLowerCase()) ||
          e.aliases.some((a) =>
            a.toLowerCase().includes(query.toLowerCase())
          )
        )
        .map((e) => ({
          entry: e,
          score: 0,
          matchType: MatchKind.Fuzzy
        }))
        .sort((a, b) => a.entry.key.localeCompare(b.entry.key))
        .slice(0, 3)
      setResults(filtered)
      setSelectedIndex(0)
    }
  }, [query, entries, activeElement, setResults, setSearching, setSelectedIndex])

  return null
}
