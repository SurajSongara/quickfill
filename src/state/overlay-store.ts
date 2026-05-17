import { create } from "zustand"

function calcPositionAndSize(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  const height = 260
  const margin = 6

  const inputWidth = rect.width
  let top = rect.bottom + margin
  let left = rect.left
  let width = Math.min(Math.max(inputWidth * 0.5, 180), 260)

  if (top + height > window.innerHeight) {
    const spaceAbove = rect.top - margin
    if (spaceAbove >= height) {
      top = rect.top - height - margin
    } else {
      top = Math.max(margin, rect.top - height - margin)
    }
  }

  if (left + width > window.innerWidth) {
    left = Math.max(margin, window.innerWidth - width - margin)
    width = Math.min(width, window.innerWidth - left - margin)
  }

  if (left < margin) left = margin

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
