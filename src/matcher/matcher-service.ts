import type { VaultEntry, FieldContext, SuggestionResult } from "~/types"
import { rankSuggestions } from "./ranking-engine"

export function getTopSuggestions(
  ctx: FieldContext,
  entries: VaultEntry[]
): SuggestionResult[] {
  return rankSuggestions(ctx, entries)
}

export function searchVault(
  query: string,
  entries: VaultEntry[]
): SuggestionResult[] {
  if (!query.trim()) return []

  const ctx: FieldContext = {
    placeholder: query,
    label: undefined,
    name: undefined,
    id: undefined,
    ariaLabel: undefined,
    type: undefined,
    tagName: "INPUT"
  }

  return rankSuggestions(ctx, entries)
}
