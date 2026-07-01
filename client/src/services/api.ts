import axios from 'axios'
import type {
  ApiMessageResponse,
  ApiTransactionResponse,
  ApiTransactionsResponse,
  Transaction,
  TransactionFormData,
  TransactionType
} from '@/types'

const api = axios.create({
  baseURL: '/api'
})

export async function fetchTransactions(params?: {
  search?: string
  category?: string
  type?: TransactionType
}): Promise<Transaction[]> {
  const res = await api.get<ApiTransactionsResponse>('/transactions', {
    params
  })
  return res.data.transactions
}

export async function createTransaction(data: TransactionFormData): Promise<Transaction> {
  const payload = {
    title: data.title,
    amount: Number(data.amount),
    type: data.type,
    category: data.category,
    date: data.date,
    note: data.note ?? ''
  }

  const res = await api.post<ApiTransactionResponse>('/transactions', payload)
  return res.data.transaction
}

export async function updateTransaction(id: string, data: TransactionFormData): Promise<Transaction> {
  const payload = {
    title: data.title,
    amount: Number(data.amount),
    type: data.type,
    category: data.category,
    date: data.date,
    note: data.note ?? ''
  }

  const res = await api.put<ApiTransactionResponse>(`/transactions/${id}`, payload)
  return res.data.transaction
}

export async function deleteTransaction(id: string): Promise<ApiMessageResponse> {
  const res = await api.delete<ApiMessageResponse>(`/transactions/${id}`)
  return res.data
}

