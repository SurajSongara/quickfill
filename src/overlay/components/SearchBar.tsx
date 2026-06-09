interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSettingsClick?: () => void
}

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.25)"
  } as React.CSSProperties,
  input: {
    flex: 1,
    padding: "6px 10px",
    fontSize: "13px",
    color: "#fff",
    background: "transparent",
    border: "none",
    outline: "none",
    boxSizing: "border-box" as const
  } as React.CSSProperties,
  gearBtn: {
    padding: "6px 8px",
    fontSize: "14px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "rgba(255, 255, 255, 0.5)",
    lineHeight: 1
  } as React.CSSProperties
}

export default function SearchBar({
  value,
  onChange,
  onSettingsClick
}: SearchBarProps) {
  return (
    <div style={styles.wrapper}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        aria-label="Search vault"
        style={styles.input}
      />
      <button
        onClick={onSettingsClick}
        aria-label="Settings"
        style={styles.gearBtn}
        title="Settings"
      >
        ⚙
      </button>
    </div>
  )
}
