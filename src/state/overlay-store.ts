import { create } from "zustand"

function calcPositionAndSize(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  const height = 200

  const inputWidth = rect.width
  let top = rect.bottom + 4
  let left = rect.left
  let width = Math.min(Math.max(inputWidth * 0.5, 180), 260)

  if (top + height > window.innerHeight) {
    top = Math.max(4, rect.top - height - 4)
  }

  if (left + width > window.innerWidth) {
    left = Math.max(4, window.innerWidth - width - 4)
    width = Math.min(width, window.innerWidth - left - 4)
  }

  if (left < 4) left = 4

  return { top, left, width }
}

interface OverlayStoreState {
  isOpen: boolean
  top: number
  left: number
  width: number
  selectedIndex: number
  activeElement: HTMLElement | null
  fillError: string | null
  open: (el: HTMLElement) => void
  close: () => void
  setFillError: (msg: string | null) => void
  selectNext: (maxIndex?: number) => void
  selectPrev: (maxIndex?: number) => void
  setSelectedIndex: (index: number) => void
}

export const useOverlayStore = create<OverlayStoreState>((set, get) => ({
  isOpen: false,
  top: 0,
  left: 0,
  width: 200,
  selectedIndex: 0,
  activeElement: null,
  fillError: null,

  open: (el) => {
    const { top, left, width } = calcPositionAndSize(el)
    set({
      isOpen: true,
      top,
      left,
      width,
      selectedIndex: 0,
      activeElement: el,
      fillError: null
    })
  },

  close: () => {
    set({
      isOpen: false,
      top: 0,
      left: 0,
      width: 200,
      selectedIndex: 0,
      activeElement: null,
      fillError: null
    })
  },

  setFillError: (fillError) => set({ fillError }),

  selectNext: (maxIndex?: number) => {
    const { selectedIndex } = get()
    if (maxIndex !== undefined && selectedIndex >= maxIndex) {
      set({ selectedIndex: 0 })
    } else {
      set({ selectedIndex: selectedIndex + 1 })
    }
  },

  selectPrev: (maxIndex?: number) => {
    const { selectedIndex } = get()
    if (selectedIndex <= 0 && maxIndex !== undefined) {
      set({ selectedIndex: maxIndex })
    } else {
      set({ selectedIndex: Math.max(0, selectedIndex - 1) })
    }
  },

  setSelectedIndex: (index) => {
    set({ selectedIndex: index })
  }
}))
