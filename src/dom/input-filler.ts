export function fillInputValue(
  el: HTMLInputElement | HTMLTextAreaElement,
  value: string
): void {
  const nativeSetter = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(el),
    "value"
  )?.set

  if (nativeSetter) {
    nativeSetter.call(el, value)
  } else {
    el.value = value
  }

  el.dispatchEvent(new Event("input", { bubbles: true, composed: true }))
  el.dispatchEvent(new Event("change", { bubbles: true }))
}
