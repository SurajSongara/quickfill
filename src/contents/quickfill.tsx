import type { PlasmoCSConfig, PlasmoGetRootContainer } from "plasmo"
import OverlayRoot from "~/overlay"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
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
  return <OverlayRoot />
}
