interface EmptyStateProps {
  onAddKey?: () => void
}

export default function EmptyState({ onAddKey }: EmptyStateProps) {
  return (
    <div
      style={{
        padding: "16px 12px 8px",
        textAlign: "center" as const,
        fontSize: "14px",
        color: "rgba(255, 255, 255, 0.6)"
      }}
    >
      No matching entries
      {onAddKey && (
        <div style={{ marginTop: "8px" }}>
          <button
            onClick={onAddKey}
            style={{
              background: "rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              borderRadius: "6px",
              color: "#fff",
              cursor: "pointer",
              fontSize: "13px",
              padding: "5px 14px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)"
            }}
          >
            + Add New Key
          </button>
        </div>
      )}
    </div>
  )
}
