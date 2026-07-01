import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TransactionForm from '@/components/TransactionForm'
import type { Transaction, TransactionFormData } from '@/types'
import { fetchTransactions, updateTransaction } from '@/services/api'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function EditTransactionPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [initial, setInitial] = useState<Partial<TransactionFormData> | null>(null)

  useEffect(() => {
    let mounted = true

    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        // Backend doesn't have GET by id; fetch all and match.
        const all = await fetchTransactions()
        const t = all.find((x) => x.id === id)
        if (!t) {
          if (!mounted) return
          setError('Transaction not found.')
          return
        }

        if (!mounted) return
        setInitial({
          title: t.title,
          amount: String(t.amount),
          type: t.type,
          category: t.category,
          date: new Date(t.date).toISOString().slice(0, 10),
          note: t.note
        })
      } catch {
        if (!mounted) return
        setError('Failed to load transaction for editing.')
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [id])

  async function onSubmit(data: TransactionFormData) {
    if (!id) return
    setError(null)
    try {
      const amountNum = Number(data.amount)
      if (!data.title || !amountNum || !data.date || !data.category || !data.type) {
        setError('Please fill all required fields correctly.')
        return
      }

      await updateTransaction(id, data)
      navigate('/transactions')
    } catch {
      setError('Failed to update transaction.')
    }
  }

  if (loading) return <LoadingSpinner />

  if (error) return <div className="rounded-xl border bg-white p-6 text-red-700">{error}</div>
  if (!initial) return null

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Edit Transaction</h2>
        <p className="mt-1 text-sm text-slate-600">Update the details and save changes.</p>
      </div>

      <TransactionForm submitLabel="Save Changes" initial={initial} onSubmit={onSubmit} error={error} />
    </section>
  )
}

