import { initFocusHandler } from "./focus-handler"
import { initKeyboardHandler } from "./keyboard-handler"

export function initEventEngine(): () => void {
  const cleanupFocus = initFocusHandler()
  const cleanupKeyboard = initKeyboardHandler()

  return () => {
    cleanupFocus()
    cleanupKeyboard()
  }
}
