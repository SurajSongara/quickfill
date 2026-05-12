import type { FieldContext } from "~/types"
import { isSupportedInput } from "./dom-utils"
import { resolveLabel } from "./label-resolver"

export function extractFieldContext(
  el: Element | null
): FieldContext | null {
  if (!isSupportedInput(el)) return null

  const label = resolveLabel(el)

  return {
    placeholder: el.placeholder || undefined,
    label,
    name: el.name || undefined,
    id: el.id || undefined,
    ariaLabel: el.getAttribute("aria-label") || undefined,
    type: el.tagName === "INPUT" ? el.type : undefined,
    tagName: el.tagName as "INPUT" | "TEXTAREA"
  }
}
