import { useSettingsStore } from "~/state/settings-store"

export default function SettingsPanel() {
  const triggerMode = useSettingsStore((s) => s.triggerMode)
  const triggerKey = useSettingsStore((s) => s.triggerKey)
  const setTriggerMode = useSettingsStore((s) => s.setTriggerMode)
  const setTriggerKey = useSettingsStore((s) => s.setTriggerKey)

  return (
    <div
      style={{
        padding: "8px 10px",
        borderTop: "1px solid rgba(255, 255, 255, 0.15)"
      }}
    >
      <div
        style={{
          fontSize: "12px",
          color: "rgba(255, 255, 255, 0.6)",
          marginBottom: "6px"
        }}
      >
        Suggestion trigger
      </div>
      <div style={{ display: "flex", gap: "4px", marginBottom: "6px" }}>
        {(["auto", "keystroke"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setTriggerMode(mode)}
            style={{
              flex: 1,
              padding: "4px 8px",
              fontSize: "12px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              fontWeight: triggerMode === mode ? 600 : 400,
              background:
                triggerMode === mode
                  ? "rgba(255, 255, 255, 0.25)"
                  : "rgba(255, 255, 255, 0.08)",
              color: "#fff"
            }}
          >
            {mode === "auto" ? "Auto" : "Keystroke"}
          </button>
        ))}
      </div>
      {triggerMode === "keystroke" && (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.6)",
              whiteSpace: "nowrap"
            }}
          >
            Trigger key:
          </span>
          <input
            value={triggerKey}
            onChange={(e) => setTriggerKey(e.target.value.slice(0, 1))}
            style={{
              width: "28px",
              padding: "2px 4px",
              fontSize: "13px",
              textAlign: "center",
              color: "#fff",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "4px",
              outline: "none"
            }}
          />
        </div>
      )}
    </div>
  )
}
