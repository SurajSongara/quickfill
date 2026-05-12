import type { VaultEntry } from "./vault"

export enum MatchKind {
  Exact = "exact",
  Alias = "alias",
  Placeholder = "placeholder",
  Label = "label",
  Fuzzy = "fuzzy"
}

export interface SuggestionResult {
  entry: VaultEntry
  score: number
  matchType: MatchKind
}
