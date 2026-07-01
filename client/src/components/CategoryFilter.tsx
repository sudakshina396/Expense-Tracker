import type { ChangeEvent } from 'react'

const categories = [
  'Food',
  'Shopping',
  'Salary',
  'Bills',
  'Travel',
  'Entertainment',
  'Other'
]

type Props = {
  value: string
  onChange: (next: string) => void
}

export default function CategoryFilter({ value, onChange }: Props) {
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange(e.target.value)
  }

  return (
    <select
      value={value}
      onChange={handleChange}
      className="w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none"
    >
      <option value="">All Categories</option>
      {categories.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  )
}

