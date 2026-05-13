import { isSupportedInput, fillInputValue } from "~/dom"
import { useOverlayStore } from "~/state/overlay-store"
import { useSearchStore } from "~/state/search-store"

export function initKeyboardHandler(): () => void {
  const onKeyDown = (e: KeyboardEvent) => {
    const el = e.target as HTMLElement
    if (!isSupportedInput(el)) return

    const { isOpen, close, selectedIndex, selectNext, selectPrev } =
      useOverlayStore.getState()
    if (!isOpen) return

    const results = useSearchStore.getState().results
    const max = results.length - 1

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        selectNext(max)
        break

      case "ArrowUp":
        e.preventDefault()
        selectPrev(max)
        break

      case "Enter": {
        e.preventDefault()
        const entry = results[selectedIndex]?.entry
        if (entry) {
          fillInputValue(el as HTMLInputElement | HTMLTextAreaElement, entry.value)
        }
        close()
        break
      }

      case "Escape":
        e.preventDefault()
        close()
        break
    }
  }

  const onInput = (e: Event) => {
    const el = e.target as HTMLInputElement | HTMLTextAreaElement
    if (!isSupportedInput(el)) return

    if (!useOverlayStore.getState().isOpen) return

    useSearchStore.getState().setQuery(el.value)
  }

  document.addEventListener("keydown", onKeyDown, true)
  document.addEventListener("input", onInput, true)

  return () => {
    document.removeEventListener("keydown", onKeyDown, true)
    document.removeEventListener("input", onInput, true)
  }
}
