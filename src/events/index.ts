import { initFocusHandler } from "./focus-handler"
import { initKeyboardHandler } from "./keyboard-handler"
import { useSettingsStore } from "~/state/settings-store"

export async function initEventEngine(): Promise<() => void> {
  await useSettingsStore.getState().load()

  const cleanupFocus = initFocusHandler()
  const cleanupKeyboard = initKeyboardHandler()

  return () => {
    cleanupFocus()
    cleanupKeyboard()
  }
}
