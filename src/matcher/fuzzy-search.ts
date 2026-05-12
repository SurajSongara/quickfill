import Fuse from "fuse.js"
import type { VaultEntry } from "~/types"

export function createFuseIndex(entries: VaultEntry[]): Fuse<VaultEntry> {
  return new Fuse(entries, {
    keys: [
      { name: "key", weight: 2 },
      { name: "aliases", weight: 1 }
    ],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 1
  })
}

export function searchFuzzy(
  fuse: Fuse<VaultEntry>,
  query: string
): Array<{ entry: VaultEntry; score: number }> {
  if (!query.trim()) return []

  const results = fuse.search(query.trim())
  return results.map((r) => ({
    entry: r.item,
    score: Math.max(0, 1 - (r.score ?? 1))
  }))
}
