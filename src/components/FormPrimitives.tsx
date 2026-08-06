import { Clock } from 'lucide-react'

export function TimeInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="inline-flex items-center gap-1.5 bg-white border border-ink-200 rounded-full pl-2.5 pr-3 py-1 hover:border-accent/60 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/15 transition-colors">
      <Clock size={13} className="text-accent shrink-0" />
      <input
        type="time"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="bg-transparent text-sm font-sans font-medium text-ink-DEFAULT outline-none tabular-nums cursor-pointer"
      />
    </div>
  )
}

export function FieldRow({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3.5 px-4">
      <span className="text-sm font-sans text-ink-400">{label}</span>
      {children}
    </div>
  )
}

export function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <p className="text-[10px] font-sans font-bold tracking-[0.18em] uppercase text-ink-500 px-1 mb-2">{title}</p>
      <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden divide-y divide-ink-200 shadow-sm">
        {children}
      </div>
    </div>
  )
}
