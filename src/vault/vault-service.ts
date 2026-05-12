import type { VaultEntry } from "~/types"
import { loadAll, saveEntry, removeEntry } from "./vault-storage"
import { validateKey, validateValue } from "./vault-validator"
import { generateId, now } from "./vault-mapper"

export interface CreateVaultEntryInput {
  key: string
  value: string
  aliases?: string[]
  category?: string
  sensitive?: boolean
}

export async function createEntry(
  input: CreateVaultEntryInput
): Promise<VaultEntry> {
  const keyResult = validateKey(input.key)
  if (!keyResult.valid) {
    throw new Error(keyResult.errors.join("; "))
  }

  const valueResult = validateValue(input.value)
  if (!valueResult.valid) {
    throw new Error(valueResult.errors.join("; "))
  }

  const timestamp = now()
  const entry: VaultEntry = {
    id: generateId(),
    key: input.key.trim(),
    value: input.value,
    aliases: input.aliases ?? [],
    category: input.category ?? "",
    sensitive: input.sensitive ?? false,
    createdAt: timestamp,
    updatedAt: timestamp
  }

  await saveEntry(entry)
  return entry
}

export async function updateEntry(
  id: string,
  data: Partial<Omit<VaultEntry, "id" | "createdAt">>
): Promise<VaultEntry> {
  const entries = await loadAll()
  const existing = entries.find((e) => e.id === id)
  if (!existing) {
    throw new Error(`Vault entry not found: ${id}`)
  }

  if (data.key !== undefined) {
    const keyResult = validateKey(data.key)
    if (!keyResult.valid) {
      throw new Error(keyResult.errors.join("; "))
    }
  }

  const updated: VaultEntry = {
    ...existing,
    ...data,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: now()
  }

  await saveEntry(updated)
  return updated
}

export async function deleteEntry(id: string): Promise<void> {
  await removeEntry(id)
}

export async function getAllEntries(): Promise<VaultEntry[]> {
  return loadAll()
}

export async function getEntryById(
  id: string
): Promise<VaultEntry | undefined> {
  const entries = await loadAll()
  return entries.find((e) => e.id === id)
}
