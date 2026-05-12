import type { VaultEntry } from "~/types"

const STORAGE_KEY = "quickfill:vault"

type VaultStorage = Record<string, VaultEntry>

export async function loadAll(): Promise<VaultEntry[]> {
  const result = await chrome.storage.local.get(STORAGE_KEY)
  const data = result[STORAGE_KEY] as VaultStorage | undefined
  if (!data) return []
  return Object.values(data)
}

export async function saveEntry(entry: VaultEntry): Promise<void> {
  const result = await chrome.storage.local.get(STORAGE_KEY)
  const data = (result[STORAGE_KEY] as VaultStorage | undefined) || {}
  data[entry.id] = entry
  await chrome.storage.local.set({ [STORAGE_KEY]: data })
}

export async function removeEntry(id: string): Promise<void> {
  const result = await chrome.storage.local.get(STORAGE_KEY)
  const data = (result[STORAGE_KEY] as VaultStorage | undefined) || {}
  delete data[id]
  await chrome.storage.local.set({ [STORAGE_KEY]: data })
}
