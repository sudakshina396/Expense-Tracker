import { Schema, model, type InferSchemaType } from 'mongoose'

export type TransactionType = 'Income' | 'Expense'

const TransactionSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    type: { type: String, required: true, enum: ['Income', 'Expense'] },
    category: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    note: { type: String, required: false, trim: true },
    createdAt: { type: Date, default: () => new Date() }
  },
  {
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        const record = ret as unknown as { _id?: unknown; __v?: unknown; id?: unknown }
        if (typeof record._id !== 'undefined') record.id = record._id
        delete (record as { _id?: unknown })._id
        delete (record as { __v?: unknown }).__v
      }
    }
  }
)

export type Transaction = InferSchemaType<typeof TransactionSchema> & {
  id: string
}

const TransactionModel = model('Transaction', TransactionSchema)
export default TransactionModel


