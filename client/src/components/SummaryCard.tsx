import { ReactNode } from 'react'

type Props = {
  label: string
  value: string
  icon: ReactNode
  tone?: 'green' | 'red' | 'neutral'
}

export default function SummaryCard({ label, value, icon, tone = 'neutral' }: Props) {
  const toneClasses =
    tone === 'green'
      ? 'border-green-200 bg-green-50 text-green-900'
      : tone === 'red'
        ? 'border-red-200 bg-red-50 text-red-900'
        : 'border-slate-200 bg-slate-50 text-slate-900'

  return (
    <section className={`rounded-xl border p-4 ${toneClasses}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-600">{label}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
        </div>
        <div className="text-xl">{icon}</div>
      </div>
    </section>
  )
}

