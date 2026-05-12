import type { VaultEntry } from "~/types"

export function matchAliases(
  entry: VaultEntry,
  terms: Set<string>
): boolean {
  for (const alias of entry.aliases) {
    const lower = alias.toLowerCase().trim()
    if (lower.length > 0 && terms.has(lower)) {
      return true
    }
  }
  return false
}
