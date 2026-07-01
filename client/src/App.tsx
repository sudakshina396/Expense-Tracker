import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import DashboardPage from '@/pages/DashboardPage'
import TransactionsPage from '@/pages/TransactionsPage'
import AddTransactionPage from '@/pages/AddTransactionPage'
import EditTransactionPage from '@/pages/EditTransactionPage'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/transactions/add" element={<AddTransactionPage />} />
          <Route path="/transactions/edit/:id" element={<EditTransactionPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

