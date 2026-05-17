import { useState, useEffect } from "react"
import { useVaultStore } from "~/state/vault-store"
import { useSessionStore } from "~/state/session-store"

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  zIndex: 2147483647,
  top: "30%",
  left: "50%",
  transform: "translateX(-50%)",
  background: "rgba(16, 185, 129, 0.65)",
  borderRadius: "10px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
  border: "2px solid rgba(255, 255, 255, 0.75)",
  backdropFilter: "blur(4px)",
  width: "300px",
  padding: "12px",
  animation: "qfFadeSlideIn 0.2s ease-out"
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "6px 8px",
  fontSize: "13px",
  color: "#fff",
  background: "rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "6px",
  outline: "none",
  boxSizing: "border-box"
}

const actionsStyle: React.CSSProperties = {
  display: "flex",
  gap: "6px",
  justifyContent: "flex-end",
  marginTop: "8px"
}

const primaryBtn: React.CSSProperties = {
  padding: "5px 14px",
  fontSize: "13px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontWeight: 500,
  background: "rgba(255, 255, 255, 0.2)",
  color: "#fff"
}

const secondaryBtn: React.CSSProperties = {
  padding: "5px 14px",
  fontSize: "13px",
  borderRadius: "6px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  cursor: "pointer",
  fontWeight: 500,
  background: "transparent",
  color: "rgba(255, 255, 255, 0.7)"
}

const labelStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "rgba(255, 255, 255, 0.7)",
  marginBottom: "3px"
}

export default function QuickSaveModal() {
  const savedText = useSessionStore((s) => s.savedText)
  const setSavedText = useSessionStore((s) => s.setSavedText)
  const vaultCreate = useVaultStore((s) => s.create)
  const fetchAll = useVaultStore((s) => s.fetchAll)

  const [key, setKey] = useState("")
  const [value, setValue] = useState(savedText ?? "")
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (savedText) setValue(savedText)
  }, [savedText])

  if (!savedText) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!key.trim() || !value.trim()) {
      setError("Key and value are required")
      return
    }
    setSaving(true)
    setError("")
    try {
      await vaultCreate({ key: key.trim(), value: value.trim() })
      await fetchAll()
      setSavedText(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save")
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setSavedText(null)
  }

  return (
    <div style={overlayStyle}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "8px" }}>
          <div style={labelStyle}>Key</div>
          <input
            placeholder="e.g. full_name"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            style={inputStyle}
            autoFocus
          />
        </div>
        <div style={{ marginBottom: "8px" }}>
          <div style={labelStyle}>Value</div>
          <input
            placeholder="Selected text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={inputStyle}
          />
        </div>

        {error && (
          <div style={{ fontSize: "12px", color: "#fca5a5", padding: "4px 0" }}>
            {error}
          </div>
        )}

        <div style={actionsStyle}>
          <button type="button" onClick={handleCancel} style={secondaryBtn} disabled={saving}>
            Cancel
          </button>
          <button type="submit" style={primaryBtn} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  )
}
