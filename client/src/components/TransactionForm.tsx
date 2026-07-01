import type { FormEvent } from 'react'
import type { TransactionFormData, TransactionType } from '@/types'

const categories = ['Food', 'Shopping', 'Salary', 'Bills', 'Travel', 'Entertainment', 'Other']

type Props = {
  initial?: Partial<TransactionFormData>
  submitLabel: string
  onSubmit: (data: TransactionFormData) => Promise<void>
  error?: string | null
  loading?: boolean
}

export default function TransactionForm({
  initial,
  submitLabel,
  onSubmit,
  error,
  loading
}: Props) {
  const initialData: TransactionFormData = {
    title: initial?.title ?? '',
    amount: initial?.amount ?? '',
    type: (initial?.type as TransactionType | undefined) ?? 'Expense',
    category: initial?.category ?? 'Other',
    date: initial?.date ?? new Date().toISOString().slice(0, 10),
    note: initial?.note ?? ''
  }

  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)

        const next: TransactionFormData = {
          title: String(formData.get('title') ?? '').trim(),
          amount: String(formData.get('amount') ?? '').trim(),
          type: String(formData.get('type') ?? 'Expense') as TransactionType,
          category: String(formData.get('category') ?? 'Other'),
          date: String(formData.get('date') ?? ''),
          note: String(formData.get('note') ?? '').trim() || undefined
        }

        onSubmit(next)
      }}
      className="rounded-xl border bg-white p-5"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
          <input name="title" defaultValue={initialData.title} required className="w-full rounded-lg border px-3 py-2 text-sm outline-none" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Amount</label>
          <input
            name="amount"
            type="number"
            step="0.01"
            min="0"
            defaultValue={initialData.amount}
            required
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Type</label>
          <select name="type" defaultValue={initialData.type} className="w-full rounded-lg border px-3 py-2 text-sm outline-none">
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
          <select name="category" defaultValue={initialData.category} className="w-full rounded-lg border px-3 py-2 text-sm outline-none">
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Date</label>
          <input name="date" type="date" defaultValue={initialData.date} required className="w-full rounded-lg border px-3 py-2 text-sm outline-none" />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Note (optional)</label>
          <input name="note" defaultValue={initialData.note} placeholder="Add a short note..." className="w-full rounded-lg border px-3 py-2 text-sm outline-none" />
        </div>
      </div>

      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Saving...' : submitLabel}
      </button>

      <p className="mt-3 text-xs text-slate-500">All fields marked required are validated before submission.</p>
    </form>
  )
}

