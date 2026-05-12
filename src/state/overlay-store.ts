import { create } from "zustand"

interface OverlayStoreState {
  isOpen: boolean
  top: number
  left: number
  selectedIndex: number
  activeElement: HTMLElement | null
  open: (el: HTMLElement) => void
  close: () => void
  setPosition: (top: number, left: number) => void
  selectNext: () => void
  selectPrev: () => void
  setSelectedIndex: (index: number) => void
}

export const useOverlayStore = create<OverlayStoreState>((set, get) => ({
  isOpen: false,
  top: 0,
  left: 0,
  selectedIndex: 0,
  activeElement: null,

  open: (el) => {
    const rect = el.getBoundingClientRect()
    set({
      isOpen: true,
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
      selectedIndex: 0,
      activeElement: el
    })
  },

  close: () => {
    set({
      isOpen: false,
      top: 0,
      left: 0,
      selectedIndex: 0,
      activeElement: null
    })
  },

  setPosition: (top, left) => {
    set({ top, left })
  },

  selectNext: () => {
    const { selectedIndex } = get()
    set({ selectedIndex: selectedIndex + 1 })
  },

  selectPrev: () => {
    const { selectedIndex } = get()
    set({ selectedIndex: Math.max(0, selectedIndex - 1) })
  },

  setSelectedIndex: (index) => {
    set({ selectedIndex: index })
  }
}))
