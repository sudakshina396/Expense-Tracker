import { useEffect, useMemo, useState } from 'react'
import type { Transaction, TransactionType } from '@/types'
import SummaryCard from '@/components/SummaryCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import { fetchTransactions } from '@/services/api'

function formatMoney(amount: number) {
  return amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
}

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await fetchTransactions()
        if (!mounted) return
        setTransactions(data)
      } catch {
        if (!mounted) return
        setError('Failed to load dashboard data.')
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const totals = useMemo(() => {
    const items = transactions ?? []
    const totalIncome = items
      .filter((t) => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0)
    const totalExpense = items
      .filter((t) => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0)
    const balance = totalIncome - totalExpense
    return { totalIncome, totalExpense, balance }
  }, [transactions])

  if (error) return <div className="rounded-xl border bg-white p-6 text-red-700">{error}</div>
  if (transactions === null) return <LoadingSpinner />

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard label="Current Balance" value={formatMoney(totals.balance)} icon={'💰'} tone={totals.balance >= 0 ? 'green' : 'red'} />
        <SummaryCard label="Total Income" value={formatMoney(totals.totalIncome)} icon={'📈'} tone="green" />
        <SummaryCard label="Total Expense" value={formatMoney(totals.totalExpense)} icon={'📉'} tone="red" />
      </div>

      <div className="rounded-xl border bg-white p-6">
        <h2 className="text-base font-semibold">Overview</h2>
        <p className="mt-2 text-sm text-slate-600">
          Your balance updates automatically based on Income and Expense transactions.
        </p>
      </div>
    </div>
  )
}

