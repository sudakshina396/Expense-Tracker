type Props = {
  title: string
  description?: string
  action?: React.ReactNode
}

export default function EmptyState({ title, description, action }: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      {description ? <p className="mt-2 text-sm text-slate-600">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}

