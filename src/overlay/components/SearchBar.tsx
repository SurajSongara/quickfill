interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

const styles = {
  input: {
    width: "100%",
    padding: "6px 10px",
    fontSize: "13px",
    color: "#fff",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255, 255, 255, 0.25)",
    outline: "none",
    boxSizing: "border-box" as const
  } as React.CSSProperties
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search..."
      aria-label="Search vault"
      style={styles.input}
    />
  )
}
