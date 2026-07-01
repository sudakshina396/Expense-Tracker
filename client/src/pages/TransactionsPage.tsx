import { useEffect, useMemo, useState } from 'react'
import type { Transaction, TransactionType } from '@/types'
import { deleteTransaction, fetchTransactions } from '@/services/api'
import TransactionTable from '@/components/TransactionTable'
import LoadingSpinner from '@/components/LoadingSpinner'
import EmptyState from '@/components/EmptyState'
import SearchBar from '@/components/SearchBar'
import CategoryFilter from '@/components/CategoryFilter'
import { useNavigate } from 'react-router-dom'

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [type, setType] = useState<TransactionType | ''>('')

  const navigate = useNavigate()

  const query = useMemo(() => {
    return {
      search: search.trim() || undefined,
      category: category || undefined,
      type: type || undefined
    }
  }, [search, category, type])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchTransactions(query)
        if (!mounted) return
        setTransactions(data)
      } catch {
        if (!mounted) return
        setError('Failed to load transactions.')
      } finally {
        if (!mounted) return
        setLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [query])

  async function handleDelete(id: string) {
    const ok = window.confirm('Delete this transaction?')
    if (!ok) return

    try {
      await deleteTransaction(id)
      setTransactions((prev) => prev.filter((t) => t.id !== id))
    } catch {
      setError('Failed to delete transaction.')
    }
  }

  return (
    <section className="space-y-4">
      <div className="rounded-xl border bg-white p-4">
        <h2 className="text-base font-semibold">Transactions</h2>
        <p className="mt-1 text-sm text-slate-600">Search and filter results using API query parameters.</p>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter value={category} onChange={setCategory} />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as TransactionType | '')}
            className="w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none"
          >
            <option value="">All Types</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-600">{transactions.length} results</p>
          <button
            onClick={() => navigate('/transactions/add')}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Add Transaction
          </button>
        </div>
      </div>

      {loading ? <LoadingSpinner /> : null}
      {error ? <div className="rounded-xl border bg-white p-6 text-red-700">{error}</div> : null}

      {!loading && !error ? (
        transactions.length ? (
          <TransactionTable transactions={transactions} onDelete={handleDelete} />
        ) : (
          <EmptyState
            title="No transactions found"
            description="Try adjusting search or filters, or add a new transaction."
            action={
              <button
                onClick={() => navigate('/transactions/add')}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Add Transaction
              </button>
            }
          />
        )
      ) : null}
    </section>
  )
}

