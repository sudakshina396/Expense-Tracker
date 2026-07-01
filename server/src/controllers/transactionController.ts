import type { Request, Response } from 'express'
import TransactionModel, { type TransactionType } from '../models/Transaction'

function parseType(input: unknown): TransactionType | undefined {
  if (input === 'Income' || input === 'Expense') return input
  return undefined
}

export async function getTransactions(req: Request, res: Response) {
  try {
    const { search, category, type } = req.query

    const filter: Record<string, unknown> = {}

    if (typeof search === 'string' && search.trim().length > 0) {
      filter.title = { $regex: search.trim(), $options: 'i' }
    }

    if (typeof category === 'string' && category.trim().length > 0) {
      filter.category = category.trim()
    }

    const parsedType = parseType(type)
    if (parsedType) {
      filter.type = parsedType
    }

    const transactions = await TransactionModel.find(filter)
      .sort({ date: -1, createdAt: -1 })
      .exec()

    res.status(200).json({ transactions })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch transactions' })
  }
}

export async function postTransaction(req: Request, res: Response) {
  try {
    const { title, amount, type, category, date, note } = req.body as {
      title?: string
      amount?: number
      type?: TransactionType
      category?: string
      date?: string
      note?: string
    }

    if (!title || !amount || !type || !category || !date) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const created = await TransactionModel.create({
      title: title.trim(),
      amount,
      type,
      category: category.trim(),
      date: new Date(date),
      note: typeof note === 'string' && note.trim().length > 0 ? note.trim() : undefined
    })

    res.status(201).json({ transaction: created })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to create transaction' })
  }
}

export async function putTransaction(req: Request, res: Response) {
  try {
    const { id } = req.params

    const { title, amount, type, category, date, note } = req.body as {
      title?: string
      amount?: number
      type?: TransactionType
      category?: string
      date?: string
      note?: string
    }

    if (!title || !amount || !type || !category || !date) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const updated = await TransactionModel.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        amount,
        type,
        category: category.trim(),
        date: new Date(date),
        note: typeof note === 'string' && note.trim().length > 0 ? note.trim() : undefined
      },
      { new: true, runValidators: true }
    ).exec()

    if (!updated) {
      return res.status(404).json({ message: 'Transaction not found' })
    }

    res.status(200).json({ transaction: updated })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to update transaction' })
  }
}

export async function deleteTransaction(req: Request, res: Response) {
  try {
    const { id } = req.params

    const deleted = await TransactionModel.findByIdAndDelete(id).exec()

    if (!deleted) {
      return res.status(404).json({ message: 'Transaction not found' })
    }

    res.status(200).json({ message: 'Transaction deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to delete transaction' })
  }
}

