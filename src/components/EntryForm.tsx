import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { HeadacheEntry, Severity, HeadacheType, Lang } from '@/types'
import { T } from '@/i18n'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  existing: HeadacheEntry | null
  lang: Lang
  onSave: (e: HeadacheEntry) => void
  onBack: () => void
}

function FieldRow({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3.5 px-4">
      <span className="text-sm font-sans text-ink-400">{label}</span>
      {children}
    </div>
  )
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <p className="text-[10px] font-sans font-bold tracking-[0.18em] uppercase text-ink-500 px-1 mb-2">{title}</p>
      <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden divide-y divide-ink-200 shadow-sm">
        {children}
      </div>
    </div>
  )
}

export function EntryForm({ existing, lang, onSave, onBack }: Props) {
  const t = T[lang]
  const today = new Date().toISOString().slice(0, 10)
  const nowTime = new Date().toTimeString().slice(0, 5)

  const [date, setDate]           = useState(existing?.date ?? today)
  const [startTime, setStartTime] = useState(existing?.startTime ?? nowTime)
  const [endTime, setEndTime]     = useState(existing?.endTime ?? '')
  const [severity, setSeverity]   = useState<Severity>(existing?.severity ?? 'latt')
  const [type, setType]           = useState<HeadacheType>(existing?.type ?? 'migran')
  const [triggers, setTriggers]   = useState(existing?.triggers ?? '')

  const handleSave = () => {
    onSave({ id: existing?.id ?? uuidv4(), date, startTime, endTime: endTime || undefined, severity, type, triggers: triggers.trim() })
  }

  return (
    <div className="flex flex-col h-full bg-ink-900">
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-[calc(env(safe-area-inset-top,0px)+16px)] pb-3.5 border-b border-ink-200 bg-ink-900/95 backdrop-blur-sm shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-ink-400 hover:text-ink-DEFAULT transition-colors p-1 -ml-1"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-sans">{t.back}</span>
        </button>
        <h2 className="font-serif text-lg font-light text-ink-DEFAULT">
          {existing ? t.editEntry : t.newEntry}
        </h2>
        <Button size="sm" onClick={handleSave} className="gap-1.5">
          <Check size={14} />
          {t.save}
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto px-4 pt-5 pb-10">

        {/* Date & Time */}
        <SectionCard title={t.dateSection}>
          <FieldRow label={t.date}>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="bg-transparent text-sm font-sans text-ink-DEFAULT text-right outline-none"
            />
          </FieldRow>
          <FieldRow label={t.starts}>
            <input
              type="time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              className="bg-transparent text-sm font-sans font-medium text-ink-DEFAULT text-right outline-none tabular-nums"
            />
          </FieldRow>
          <FieldRow label={<>{t.ends} <span className="text-[10px] text-ink-600 ml-1.5 tracking-wider uppercase">{t.optional}</span></>}>
            <input
              type="time"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              className="bg-transparent text-sm font-sans font-medium text-ink-DEFAULT text-right outline-none tabular-nums"
            />
          </FieldRow>
        </SectionCard>

        {/* Severity */}
        <SectionCard title={t.severitySection}>
          {(Object.keys(t.severity) as Severity[]).map(s => {
            const m = t.severity[s]
            const sel = severity === s
            return (
              <button
                key={s}
                className={cn(
                  'w-full flex items-center gap-3.5 px-4 py-3.5 text-left transition-colors',
                  sel ? 'bg-ink-100' : 'hover:bg-ink-50'
                )}
                onClick={() => setSeverity(s)}
              >
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                  style={{ borderColor: m.color, background: sel ? m.color : 'transparent' }}
                >
                  {sel && <Check size={11} className="text-ink-900" strokeWidth={3} />}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-sans font-semibold" style={{ color: sel ? m.color : '#7a6055' }}>
                    {m.label}
                  </span>
                  <span className="text-xs font-sans text-ink-400 mt-0.5">{m.desc}</span>
                </div>
              </button>
            )
          })}
        </SectionCard>

        {/* Type */}
        <SectionCard title={t.typeSection}>
          {(Object.keys(t.types) as HeadacheType[]).map(tp => {
            const m = t.types[tp]
            const sel = type === tp
            return (
              <button
                key={tp}
                className={cn(
                  'w-full flex items-center gap-3.5 px-4 py-3.5 text-left transition-colors',
                  sel ? 'bg-ink-100' : 'hover:bg-ink-50'
                )}
                onClick={() => setType(tp)}
              >
                <div className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-sans font-bold transition-all',
                  sel ? 'bg-accent text-white' : 'bg-ink-100 text-ink-400'
                )}>
                  {m.num}
                </div>
                <span className={cn('text-sm font-sans', sel ? 'text-accent font-semibold' : 'text-ink-500 font-normal')}>
                  {m.label}
                </span>
              </button>
            )
          })}
        </SectionCard>

        {/* Triggers */}
        <SectionCard title={t.triggersSection}>
          <div className="px-4 py-3">
            <textarea
              className="w-full bg-transparent text-sm font-sans text-ink-DEFAULT placeholder:text-ink-300 outline-none resize-none leading-relaxed"
              placeholder={t.triggersPlaceholder}
              value={triggers}
              onChange={e => setTriggers(e.target.value)}
              rows={4}
            />
          </div>
        </SectionCard>

      </main>
    </div>
  )
}
