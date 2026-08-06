import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { HeadacheOccurrence, Severity, HeadacheType, Lang } from '@/types'
import { T } from '@/i18n'
import { Button } from '@/components/ui/button'
import { FieldRow, SectionCard, TimeInput } from '@/components/FormPrimitives'
import { Plus, Trash2, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  headaches: HeadacheOccurrence[]
  lang: Lang
  onChange: (headaches: HeadacheOccurrence[]) => void
}

function nowTime() {
  return new Date().toTimeString().slice(0, 5)
}

function blank(): HeadacheOccurrence {
  return { id: uuidv4(), startTime: nowTime(), endTime: undefined, severity: 'latt', type: 'migran', triggers: '' }
}

export function HeadacheSection({ headaches, lang, onChange }: Props) {
  const t = T[lang]
  const [draft, setDraft] = useState<HeadacheOccurrence | null>(null)
  const isNew = draft !== null && !headaches.some(h => h.id === draft.id)

  const startAdd = () => setDraft(blank())
  const startEdit = (h: HeadacheOccurrence) => setDraft({ ...h })
  const cancel = () => setDraft(null)

  const save = () => {
    if (!draft) return
    const exists = headaches.some(h => h.id === draft.id)
    onChange(exists ? headaches.map(h => h.id === draft.id ? draft : h) : [draft, ...headaches])
    setDraft(null)
  }

  const remove = (id: string) => {
    onChange(headaches.filter(h => h.id !== id))
    if (draft?.id === id) setDraft(null)
  }

  return (
    <SectionCard title={t.headachesSection}>
      {headaches.length === 0 && draft === null && (
        <p className="px-4 py-3.5 text-sm font-sans text-ink-400">{t.noHeadaches}</p>
      )}
      {headaches.map(h => (
        draft?.id === h.id ? (
          <OccurrenceForm key={h.id} draft={draft} setDraft={setDraft} lang={lang} onSave={save} onCancel={cancel} />
        ) : (
          <button
            key={h.id}
            className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left hover:bg-ink-50 transition-colors"
            onClick={() => startEdit(h)}
          >
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <span className="text-xs font-sans text-ink-400 tabular-nums shrink-0">
                {h.startTime}{h.endTime ? ` → ${h.endTime}` : ''}
              </span>
              <span
                className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded-full border shrink-0"
                style={{ color: t.severity[h.severity].color, borderColor: t.severity[h.severity].color + '40', background: t.severity[h.severity].color + '18' }}
              >
                {t.severity[h.severity].label}
              </span>
              <span className="text-xs font-sans text-ink-500 truncate">{t.types[h.type].label}</span>
            </div>
            <span
              className="shrink-0 p-1.5 text-ink-300 hover:text-sev-severe transition-colors"
              onClick={e => { e.stopPropagation(); remove(h.id) }}
            >
              <Trash2 size={14} />
            </span>
          </button>
        )
      ))}
      {isNew && draft && (
        <OccurrenceForm draft={draft} setDraft={setDraft} lang={lang} onSave={save} onCancel={cancel} />
      )}
      {draft === null && (
        <button
          onClick={startAdd}
          className="w-full flex items-center justify-center gap-1.5 px-4 py-3 text-accent font-sans font-semibold text-sm hover:bg-ink-50 transition-colors"
        >
          <Plus size={15} /> {t.addHeadache}
        </button>
      )}
    </SectionCard>
  )
}

function OccurrenceForm({ draft, setDraft, lang, onSave, onCancel }: {
  draft: HeadacheOccurrence
  setDraft: (d: HeadacheOccurrence) => void
  lang: Lang
  onSave: () => void
  onCancel: () => void
}) {
  const t = T[lang]
  return (
    <div className="bg-ink-50">
      <FieldRow label={t.starts}>
        <TimeInput value={draft.startTime} onChange={v => setDraft({ ...draft, startTime: v })} />
      </FieldRow>
      <FieldRow label={<>{t.ends} <span className="text-[10px] text-ink-600 ml-1.5 tracking-wider uppercase">{t.optional}</span></>}>
        <TimeInput value={draft.endTime ?? ''} onChange={v => setDraft({ ...draft, endTime: v || undefined })} />
      </FieldRow>
      <div className="px-4 py-3">
        <p className="text-[10px] font-sans font-bold tracking-[0.14em] uppercase text-ink-500 mb-2">{t.severitySection}</p>
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(t.severity) as Severity[]).map(s => {
            const m = t.severity[s]
            const sel = draft.severity === s
            return (
              <button
                key={s}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-sans font-semibold transition-all"
                style={{ borderColor: m.color, background: sel ? m.color : 'transparent', color: sel ? '#fff' : m.color }}
                onClick={() => setDraft({ ...draft, severity: s })}
              >
                {m.label}
              </button>
            )
          })}
        </div>
      </div>
      <div className="px-4 py-3">
        <p className="text-[10px] font-sans font-bold tracking-[0.14em] uppercase text-ink-500 mb-2">{t.typeSection}</p>
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(t.types) as HeadacheType[]).map(tp => {
            const m = t.types[tp]
            const sel = draft.type === tp
            return (
              <button
                key={tp}
                className={cn(
                  'px-3 py-1.5 rounded-full border text-xs font-sans font-semibold transition-all',
                  sel ? 'bg-accent text-white border-accent' : 'text-ink-500 border-ink-200'
                )}
                onClick={() => setDraft({ ...draft, type: tp })}
              >
                {m.num} · {m.label}
              </button>
            )
          })}
        </div>
      </div>
      <div className="px-4 py-3">
        <p className="text-[10px] font-sans font-bold tracking-[0.14em] uppercase text-ink-500 mb-2">{t.triggersSection}</p>
        <textarea
          className="w-full bg-white rounded-lg border border-ink-200 px-3 py-2 text-sm font-sans text-ink-DEFAULT placeholder:text-ink-300 outline-none resize-none leading-relaxed"
          placeholder={t.triggersPlaceholder}
          value={draft.triggers}
          onChange={e => setDraft({ ...draft, triggers: e.target.value })}
          rows={2}
        />
      </div>
      <div className="flex gap-2 px-4 py-3">
        <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={onCancel}>
          <X size={14} /> {t.cancel}
        </Button>
        <Button size="sm" className="flex-1 gap-1.5" onClick={onSave}>
          <Check size={14} /> {t.save}
        </Button>
      </div>
    </div>
  )
}
