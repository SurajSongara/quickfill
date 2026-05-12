export interface OverlayPosition {
  top: number
  left: number
}

export interface OverlayState {
  isOpen: boolean
  position: OverlayPosition | null
  selectedIndex: number
}
