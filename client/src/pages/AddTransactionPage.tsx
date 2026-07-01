import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TransactionForm from '@/components/TransactionForm'
import type { TransactionFormData } from '@/types'
import { createTransaction } from '@/services/api'

export default function AddTransactionPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  async function onSubmit(data: TransactionFormData) {
    setLoading(true)
    setError(null)

    try {
      const amountNum = Number(data.amount)
      if (!data.title || !amountNum || !data.date || !data.category || !data.type) {
        setError('Please fill all required fields correctly.')
        return
      }

      await createTransaction(data)
      navigate('/transactions')
    } catch {
      setError('Failed to create transaction.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Add Transaction</h2>
        <p className="mt-1 text-sm text-slate-600">Create a new income or expense record.</p>
      </div>

      <TransactionForm submitLabel="Create" onSubmit={onSubmit} error={error} loading={loading} />
    </section>
  )
}

