import { create } from "zustand"
import type { SuggestionResult } from "~/types"

interface SearchStoreState {
  query: string
  results: SuggestionResult[]
  isSearching: boolean
  setQuery: (q: string) => void
  setResults: (r: SuggestionResult[]) => void
  setSearching: (s: boolean) => void
  clear: () => void
}

export const useSearchStore = create<SearchStoreState>((set) => ({
  query: "",
  results: [],
  isSearching: false,

  setQuery: (query) => {
    set({ query })
  },

  setResults: (results) => {
    set({ results, isSearching: false })
  },

  setSearching: (isSearching) => {
    set({ isSearching })
  },

  clear: () => {
    set({ query: "", results: [], isSearching: false })
  }
}))
