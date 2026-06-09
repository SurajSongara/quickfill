import { useState, useEffect, useRef } from "react"
import type { CreateVaultEntryInput } from "~/vault/vault-service"

interface AddKeyModalProps {
  onSubmit: (input: CreateVaultEntryInput) => Promise<void>
  onCancel: () => void
}

export default function AddKeyModal({ onSubmit, onCancel }: AddKeyModalProps) {
  const keyRef = useRef<HTMLInputElement>(null)
  const [key, setKey] = useState("")
  const [value, setValue] = useState("")
  const [aliases, setAliases] = useState("")
  const [sensitive, setSensitive] = useState(false)
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    keyRef.current?.focus()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!key.trim() || !value.trim()) {
      setError("Key and value are required")
      return
    }
    setSaving(true)
    setError("")
    try {
      await onSubmit({
        key: key.trim(),
        value: value.trim(),
        aliases: aliases
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
        sensitive
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save")
      setSaving(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      }}
    >
      <input
        ref={keyRef}
        placeholder="Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        style={inputStyle}
      />
      <input
        placeholder="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={inputStyle}
      />
      <input
        placeholder="Aliases (comma-separated, optional)"
        value={aliases}
        onChange={(e) => setAliases(e.target.value)}
        style={inputStyle}
      />
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "12px",
          color: "rgba(255, 255, 255, 0.75)",
          cursor: "pointer"
        }}
      >
        <input
          type="checkbox"
          checked={sensitive}
          onChange={(e) => setSensitive(e.target.checked)}
          style={{ accentColor: "#10b981" }}
        />
        Sensitive (value masked in suggestions)
      </label>

      {error && (
        <div
          style={{
            fontSize: "12px",
            color: "#fca5a5",
            padding: "4px 0"
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: "6px",
          justifyContent: "flex-end",
          marginTop: "2px"
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          style={secondaryBtnStyle}
          disabled={saving}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={primaryBtnStyle}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  )
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

const baseBtn: React.CSSProperties = {
  padding: "5px 14px",
  fontSize: "13px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontWeight: 500,
  boxSizing: "border-box"
}

const primaryBtnStyle: React.CSSProperties = {
  ...baseBtn,
  background: "rgba(255, 255, 255, 0.2)",
  color: "#fff"
}

const secondaryBtnStyle: React.CSSProperties = {
  ...baseBtn,
  background: "transparent",
  color: "rgba(255, 255, 255, 0.7)",
  border: "1px solid rgba(255, 255, 255, 0.2)"
}
