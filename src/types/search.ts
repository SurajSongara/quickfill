import type { SuggestionResult } from "./matcher"

export interface SearchState {
  query: string
  results: SuggestionResult[]
  isSearching: boolean
}
