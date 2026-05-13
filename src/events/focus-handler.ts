import { isSupportedInput } from "~/dom"
import { useOverlayStore } from "~/state/overlay-store"
import { useSearchStore } from "~/state/search-store"

function log(...args: unknown[]) {
  console.log("[QuickFill]", ...args)
}

export function initFocusHandler(): () => void {
  const onFocusIn = (e: FocusEvent) => {
    const el = e.target as HTMLElement
    if (!isSupportedInput(el)) return

    const overlayEl = document.getElementById("quickfill-overlay")
    if (overlayEl && overlayEl.contains(el)) return

    log("focus:", el.id || el.name || el.placeholder || el.tagName)
    useOverlayStore.getState().open(el)
    useSearchStore.getState().setQuery("")
  }

  const onFocusOut = (e: FocusEvent) => {
    const related = e.relatedTarget as HTMLElement | null

    if (related && isSupportedInput(related)) return

    const overlayEl = document.getElementById("quickfill-overlay")
    if (overlayEl && related && overlayEl.contains(related)) return

    log("close: focus moved outside")
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
