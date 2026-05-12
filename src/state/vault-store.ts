import { create } from "zustand"
import type { VaultEntry } from "~/types"
import {
  getAllEntries,
  createEntry,
  updateEntry,
  deleteEntry
} from "~/vault/vault-service"
import type { CreateVaultEntryInput } from "~/vault/vault-service"

interface VaultStoreState {
  entries: VaultEntry[]
  isLoading: boolean
  error: string | null
  fetchAll: () => Promise<void>
  create: (input: CreateVaultEntryInput) => Promise<VaultEntry>
  update: (id: string, data: Partial<VaultEntry>) => Promise<VaultEntry>
  remove: (id: string) => Promise<void>
}

export const useVaultStore = create<VaultStoreState>((set, get) => ({
  entries: [],
  isLoading: false,
  error: null,

  fetchAll: async () => {
    set({ isLoading: true, error: null })
    try {
      const entries = await getAllEntries()
      set({ entries, isLoading: false })
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to load vault",
        isLoading: false
      })
    }
  },

  create: async (input) => {
    const entry = await createEntry(input)
    set({ entries: [...get().entries, entry] })
    return entry
  },

  update: async (id, data) => {
    const updated = await updateEntry(id, data)
    set({
      entries: get().entries.map((e) => (e.id === id ? updated : e))
    })
    return updated
  },

  remove: async (id) => {
    await deleteEntry(id)
    set({ entries: get().entries.filter((e) => e.id !== id) })
  }
}))
