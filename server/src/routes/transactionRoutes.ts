import { Router } from 'express'
import {
  deleteTransaction,
  getTransactions,
  postTransaction,
  putTransaction
} from '../controllers/transactionController'

const router = Router()

router.get('/', getTransactions)
router.post('/', postTransaction)
router.put('/:id', putTransaction)
router.delete('/:id', deleteTransaction)

export default router

