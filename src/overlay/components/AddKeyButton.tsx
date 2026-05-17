interface AddKeyButtonProps {
  onClick: () => void
}

const btnStyle: React.CSSProperties = {
  width: "100%",
  padding: "7px 10px",
  fontSize: "13px",
  border: "none",
  cursor: "pointer",
  textAlign: "center",
  background: "transparent",
  color: "rgba(255, 255, 255, 0.8)",
  boxSizing: "border-box",
  borderTop: "1px solid rgba(255, 255, 255, 0.15)"
}

export default function AddKeyButton({ onClick }: AddKeyButtonProps) {
  return (
    <button
      style={btnStyle}
      onClick={onClick}
      aria-label="Add new vault entry"
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
        e.currentTarget.style.color = "#fff"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent"
        e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)"
      }}
    >
      + Add New Key
    </button>
  )
}
