import { useEffect } from "react"
import type { PlasmoCSConfig, PlasmoGetRootContainer } from "plasmo"
import OverlayRoot from "~/overlay"
import { initEventEngine } from "~/events"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

const STYLE_ID = "quickfill-styles"

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return

  const style = document.createElement("style")
  style.id = STYLE_ID
  style.textContent = `@keyframes qfFadeSlideIn {
  from { opacity: 0; transform: translateY(-6px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}`
  document.head.appendChild(style)
}

export const getRootContainer: PlasmoGetRootContainer = async () => {
  const id = "quickfill-overlay"
  let container = document.getElementById(id)
  if (!container) {
    container = document.createElement("div")
    container.id = id
    document.body.appendChild(container)
  }
  return container
}

export default function QuickFillContent() {
  useEffect(() => {
    injectStyles()
    const cleanup = initEventEngine()
    return cleanup
  }, [])

  return <OverlayRoot />
}
