import { useEffect, useRef } from "react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search vault..."
      className="w-full px-3 py-2 text-sm text-gray-900 bg-white border-b border-gray-200 outline-none placeholder-gray-400"
    />
  )
}
