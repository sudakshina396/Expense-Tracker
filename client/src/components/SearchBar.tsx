import type { ChangeEvent } from 'react'

type Props = {
  value: string
  onChange: (next: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value)
  }

  return (
    <div className="flex w-full items-center gap-2 rounded-xl border bg-white px-3 py-2">
      <span className="text-slate-500">🔎</span>
      <input
        value={value}
        onChange={handleChange}
        placeholder="Search by title..."
        className="w-full bg-transparent text-sm outline-none"
      />
    </div>
  )
}

