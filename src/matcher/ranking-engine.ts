import type { VaultEntry, FieldContext, SuggestionResult } from "~/types"
import { MatchKind } from "~/types"
import { matchAliases } from "./alias-matcher"
import { createFuseIndex, searchFuzzy } from "./fuzzy-search"

const MAX_SUGGESTIONS = 3

function collectSearchTerms(ctx: FieldContext): Set<string> {
  const terms = new Set<string>()

  const add = (val: string | undefined) => {
    if (val && val.trim().length > 0) {
      terms.add(val.toLowerCase().trim())
    }
  }

  add(ctx.placeholder)
  add(ctx.label)
  add(ctx.name)
  add(ctx.id)
  add(ctx.ariaLabel)

  return terms
}

function exactMatchKey(
  entry: VaultEntry,
  terms: Set<string>
): boolean {
  return terms.has(entry.key.toLowerCase().trim())
}

function partialMatchKey(
  entry: VaultEntry,
  term: string
): boolean {
  const key = entry.key.toLowerCase().trim()
  return key.length > 0 && term.length > 0 && key.includes(term)
}

export function rankSuggestions(
  ctx: FieldContext,
  entries: VaultEntry[]
): SuggestionResult[] {
  const terms = collectSearchTerms(ctx)
  if (terms.size === 0) return []

  const results: SuggestionResult[] = []
  const fuse = createFuseIndex(entries)
  const bestPerEntry = new Map<string, SuggestionResult>()

  for (const entry of entries) {
    let best: SuggestionResult | null = null

    if (exactMatchKey(entry, terms)) {
      best = { entry, score: 100, matchType: MatchKind.Exact }
    }

    if (!best && matchAliases(entry, terms)) {
      best = { entry, score: 80, matchType: MatchKind.Alias }
    }

    if (!best) {
      for (const term of terms) {
        if (partialMatchKey(entry, term)) {
          best = { entry, score: 60, matchType: MatchKind.Label }
          break
        }
      }
    }

    if (best) {
      bestPerEntry.set(entry.id, best)
    }
  }

  const fuzzyTerm = ctx.placeholder || ctx.label || ctx.name || ""
  if (fuzzyTerm) {
    const fuzzyResults = searchFuzzy(fuse, fuzzyTerm)
    for (const fr of fuzzyResults) {
      const existing = bestPerEntry.get(fr.entry.id)
      if (!existing) {
        bestPerEntry.set(fr.entry.id, {
          entry: fr.entry,
          score: Math.round(fr.score * 50),
          matchType: MatchKind.Fuzzy
        })
      }
    }
  }

  for (const result of bestPerEntry.values()) {
    results.push(result)
  }

  results.sort((a, b) => b.score - a.score)

  return results.slice(0, MAX_SUGGESTIONS)
}
