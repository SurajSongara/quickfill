import { create } from "zustand"

interface SessionStoreState {
  savedText: string | null
  setSavedText: (text: string | null) => void
}

export const useSessionStore = create<SessionStoreState>((set) => ({
  savedText: null,
  setSavedText: (text) => set({ savedText: text })
}))
