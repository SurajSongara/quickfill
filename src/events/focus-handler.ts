import { isSupportedInput } from "~/dom"
import { useOverlayStore } from "~/state/overlay-store"
import { useSearchStore } from "~/state/search-store"
import { useSessionStore } from "~/state/session-store"
import { useSettingsStore } from "~/state/settings-store"

export function initFocusHandler(): () => void {
  const onFocusIn = (e: FocusEvent) => {
    const el = e.target as HTMLElement
    if (!isSupportedInput(el)) return

    const overlayEl = document.getElementById("quickfill-overlay")
    if (overlayEl && overlayEl.contains(el)) return

    if (useSessionStore.getState().savedText) return
    if (useSettingsStore.getState().triggerMode === "keystroke") return

    useOverlayStore.getState().open(el)
    useSearchStore.getState().setQuery("")
  }

  const onFocusOut = (e: FocusEvent) => {
    const related = e.relatedTarget as HTMLElement | null

    if (related && isSupportedInput(related)) return

    const overlayEl = document.getElementById("quickfill-overlay")
    if (overlayEl && related && overlayEl.contains(related)) return

    useOverlayStore.getState().close()
    useSearchStore.getState().clear()
  }

  document.addEventListener("focusin", onFocusIn)
  document.addEventListener("focusout", onFocusOut)

  return () => {
    document.removeEventListener("focusin", onFocusIn)
    document.removeEventListener("focusout", onFocusOut)
  }
}
