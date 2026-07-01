import { Link } from 'react-router-dom'
import type { Transaction } from '@/types'

type Props = {
  transactions: Transaction[]
  onDelete: (id: string) => void
}

function formatMoney(amount: number) {
  return amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
}

function formatDate(date: string) {
  const d = new Date(date)
  return d.toLocaleDateString()
}

function badgeTone(type: Transaction['type']) {
  return type === 'Income' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'
}

export default function TransactionTable({ transactions, onDelete }: Props) {
  if (transactions.length === 0) return null

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 font-semibold text-slate-700">Title</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Amount</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Type</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Category</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Date</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-t last:border-b hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{t.title}</td>
              <td className="px-4 py-3">{formatMoney(t.amount)}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${badgeTone(t.type)}`}
                >
                  {t.type}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-700">{t.category}</td>
              <td className="px-4 py-3 text-slate-700">{formatDate(t.date)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link
                    to={`/transactions/edit/${t.id}`}
                    className="rounded-md border px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => onDelete(t.id)}
                    className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

