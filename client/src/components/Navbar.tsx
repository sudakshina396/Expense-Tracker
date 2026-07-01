import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="border-b bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-semibold text-slate-900">
          Expense Tracker
        </Link>
        <nav className="flex items-center gap-3">
          <Link
            to="/transactions"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Transactions
          </Link>
          <Link
            to="/transactions/add"
            className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            Add
          </Link>
        </nav>
      </div>
    </header>
  )
}

