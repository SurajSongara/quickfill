import { create } from "zustand"

const STORAGE_KEY = "quickfill:settings"

interface SettingsState {
  triggerMode: "auto" | "keystroke"
  triggerKey: string
  loaded: boolean
  load: () => Promise<void>
  setTriggerMode: (mode: "auto" | "keystroke") => void
  setTriggerKey: (key: string) => void
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  triggerMode: "auto",
  triggerKey: "/",
  loaded: false,

  load: async () => {
    if (get().loaded) return
    try {
      const result = await chrome.storage.local.get(STORAGE_KEY)
      const saved = result[STORAGE_KEY]
      if (saved) {
        set({
          triggerMode: saved.triggerMode ?? "auto",
          triggerKey: saved.triggerKey ?? "/",
          loaded: true
        })
      } else {
        set({ loaded: true })
      }
    } catch {
      set({ loaded: true })
    }
  },

  setTriggerMode: (triggerMode: "auto" | "keystroke") => {
    set({ triggerMode })
    chrome.storage.local.set({
      [STORAGE_KEY]: { triggerMode, triggerKey: get().triggerKey }
    })
  },

  setTriggerKey: (triggerKey: string) => {
    set({ triggerKey })
    chrome.storage.local.set({
      [STORAGE_KEY]: { triggerMode: get().triggerMode, triggerKey }
    })
  }
}))
