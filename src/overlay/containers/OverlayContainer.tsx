import { useState, useRef } from "react"
import { useOverlayStore } from "~/state/overlay-store"
import { useSearchStore } from "~/state/search-store"
import { useVaultStore } from "~/state/vault-store"
import { fillInputValue } from "~/dom"
import SearchBar from "../components/SearchBar"
import SuggestionList from "../components/SuggestionList"
import AddKeyModal from "../components/AddKeyModal"
import SettingsPanel from "../components/SettingsPanel"

export default function OverlayContainer() {
  const isOpen = useOverlayStore((s) => s.isOpen)
  const top = useOverlayStore((s) => s.top)
  const left = useOverlayStore((s) => s.left)
  const width = useOverlayStore((s) => s.width)
  const selectedIndex = useOverlayStore((s) => s.selectedIndex)
  const close = useOverlayStore((s) => s.close)
  const fillError = useOverlayStore((s) => s.fillError)
  const setFillError = useOverlayStore((s) => s.setFillError)
  const activeElement = useOverlayStore((s) => s.activeElement)

  const query = useSearchStore((s) => s.query)
  const results = useSearchStore((s) => s.results)
  const setQuery = useSearchStore((s) => s.setQuery)

  const vaultCreate = useVaultStore((s) => s.create)
  const fetchAll = useVaultStore((s) => s.fetchAll)
  const entries = useVaultStore((s) => s.entries)
  const vaultLoading = useVaultStore((s) => s.isLoading)

  const [showModal, setShowModal] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const fillErrorTimer = useRef<ReturnType<typeof setTimeout>>()

  if (!isOpen) return null

  const handleFill = (index: number) => {
    const entry = results[index]?.entry
    if (entry && activeElement) {
      try {
        fillInputValue(
          activeElement as HTMLInputElement | HTMLTextAreaElement,
          entry.value
        )
        close()
        return
      } catch {
        setFillError("Failed to fill value")
        clearTimeout(fillErrorTimer.current)
        fillErrorTimer.current = setTimeout(() => setFillError(null), 3000)
        return
      }
    }
    close()
  }

  const handleAddKey = async (input: Parameters<typeof vaultCreate>[0]) => {
    await vaultCreate(input)
    await fetchAll()
    setShowModal(false)
  }

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCancelModal = () => {
    setShowModal(false)
  }

  return (
    <div
      role="dialog"
      aria-label="QuickFill suggestions"
      style={{
        position: "fixed",
        zIndex: 2147483647,
        background: "rgba(16, 185, 129, 0.65)",
        borderRadius: "10px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
        border: "2px solid rgba(255, 255, 255, 0.75)",
        overflow: "hidden",
        animation: "qfFadeSlideIn 0.2s ease-out",
        top,
        left,
        width,
        backdropFilter: "blur(4px)"
      }}
    >
      {showModal ? (
        <AddKeyModal onSubmit={handleAddKey} onCancel={handleCancelModal} />
      ) : (
        <>
          <SearchBar
            value={query}
            onChange={setQuery}
            onSettingsClick={() => setShowSettings((v) => !v)}
          />
          {fillError && (
            <div
              style={{
                padding: "4px 10px",
                fontSize: "12px",
                color: "#fca5a5",
                background: "rgba(0,0,0,0.15)",
                textAlign: "left",
                cursor: "pointer"
              }}
              role="alert"
              onClick={() => setFillError(null)}
            >
              {fillError}
            </div>
          )}
          {showSettings ? (
            <SettingsPanel />
          ) : (
            <SuggestionList
              suggestions={results}
              selectedIndex={selectedIndex}
              onFill={handleFill}
              onAddKey={handleOpenModal}
              isVaultEmpty={!vaultLoading && entries.length === 0}
            />
          )}
        </>
      )}
    </div>
  )
}
