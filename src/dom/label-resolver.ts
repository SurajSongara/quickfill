export function resolveLabel(el: HTMLElement): string | undefined {
  if (el.id) {
    const label = document.querySelector(`label[for="${CSS.escape(el.id)}"]`)
    if (label?.textContent) {
      return label.textContent.trim()
    }
  }

  const parentLabel = el.closest("label")
  if (parentLabel?.textContent) {
    const text = parentLabel.textContent.trim()
    const inputText = (parentLabel.querySelector("input, textarea")?.textContent ?? "").trim()
    return text.replace(inputText, "").trim() || undefined
  }

  const ariaLabel = el.getAttribute("aria-label")
  if (ariaLabel) return ariaLabel

  const ariaLabelledBy = el.getAttribute("aria-labelledby")
  if (ariaLabelledBy) {
    const ref = document.getElementById(ariaLabelledBy)
    if (ref?.textContent) return ref.textContent.trim()
  }

  return undefined
}
