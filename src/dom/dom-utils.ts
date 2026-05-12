const UNSUPPORTED_INPUT_TYPES = new Set([
  "submit",
  "button",
  "checkbox",
  "radio",
  "file",
  "hidden",
  "image",
  "reset",
  "color"
])

export function isSupportedInput(
  el: Element | null
): el is HTMLInputElement | HTMLTextAreaElement {
  if (!el) return false

  if (el.tagName === "TEXTAREA") return true

  if (el.tagName === "INPUT") {
    const input = el as HTMLInputElement
    return !UNSUPPORTED_INPUT_TYPES.has(input.type)
  }

  return false
}
