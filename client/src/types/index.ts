export type TransactionType = 'Income' | 'Expense'

export type Transaction = {
  id: string
  title: string
  amount: number
  type: TransactionType
  category: string
  date: string
  note?: string
  createdAt: string
}

export type ApiTransactionsResponse = {
  transactions: Transaction[]
}

export type ApiTransactionResponse = {
  transaction: Transaction
}

export type ApiMessageResponse = {
  message: string
}

export type TransactionFormData = {
  title: string
  amount: string
  type: TransactionType
  category: string
  date: string
  note?: string
}

