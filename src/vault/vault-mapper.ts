import type { VaultEntry } from "~/types"

export function generateId(): string {
  return crypto.randomUUID()
}

export function now(): number {
  return Date.now()
}

export function toVaultEntry(data: Record<string, unknown>): VaultEntry {
  return {
    id: String(data.id),
    key: String(data.key ?? ""),
    value: String(data.value ?? ""),
    aliases: Array.isArray(data.aliases) ? data.aliases.map(String) : [],
    category: String(data.category ?? ""),
    sensitive: Boolean(data.sensitive),
    createdAt: Number(data.createdAt ?? 0),
    updatedAt: Number(data.updatedAt ?? 0)
  }
}
