import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { StoolOccurrence, Severity, BristolType, Urgency, Lang } from '@/types'
import { T } from '@/i18n'
import { Button } from '@/components/ui/button'
import { FieldRow, SectionCard, TimeInput } from '@/components/FormPrimitives'
import { Plus, Trash2, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  stools: StoolOccurrence[]
  lang: Lang
  onChange: (stools: StoolOccurrence[]) => void
}

function nowTime() {
  return new Date().toTimeString().slice(0, 5)
}

function blank(): StoolOccurrence {
  return { id: uuidv4(), time: nowTime(), bristolType: 4, urgency: 'normal', discomfort: 'latt', blood: false }
}

export function StoolSection({ stools, lang, onChange }: Props) {
  const t = T[lang]
  const [draft, setDraft] = useState<StoolOccurrence | null>(null)
  const isNew = draft !== null && !stools.some(s => s.id === draft.id)

  const startAdd = () => setDraft(blank())
  const startEdit = (s: StoolOccurrence) => setDraft({ ...s })
  const cancel = () => setDraft(null)

  const save = () => {
    if (!draft) return
    const exists = stools.some(s => s.id === draft.id)
    onChange(exists ? stools.map(s => s.id === draft.id ? draft : s) : [draft, ...stools])
    setDraft(null)
  }

  const remove = (id: string) => {
    onChange(stools.filter(s => s.id !== id))
    if (draft?.id === id) setDraft(null)
  }

  return (
    <SectionCard title={t.stoolsSection}>
      {stools.length === 0 && draft === null && (
        <p className="px-4 py-3.5 text-sm font-sans text-ink-400">{t.noStools}</p>
      )}
      {stools.map(s => (
        draft?.id === s.id ? (
          <OccurrenceForm key={s.id} draft={draft} setDraft={setDraft} lang={lang} onSave={save} onCancel={cancel} />
        ) : (
          <button
            key={s.id}
            className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left hover:bg-ink-50 transition-colors"
            onClick={() => startEdit(s)}
          >
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <span className="text-xs font-sans text-ink-400 tabular-nums shrink-0">{s.time}</span>
              <span className="text-[11px] font-sans font-medium px-2 py-0.5 rounded-full bg-ink-100 text-ink-500 border border-ink-200 shrink-0">
                {t.bristol[s.bristolType].label}
              </span>
              <span
                className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded-full border shrink-0"
                style={{ color: t.severity[s.discomfort].color, borderColor: t.severity[s.discomfort].color + '40', background: t.severity[s.discomfort].color + '18' }}
              >
                {t.severity[s.discomfort].label}
              </span>
              {s.blood && (
                <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded-full border border-sev-severe/40 bg-sev-severe/18 text-sev-severe shrink-0">
                  {t.bloodSection}
                </span>
              )}
            </div>
            <span
              className="shrink-0 p-1.5 text-ink-300 hover:text-sev-severe transition-colors"
              onClick={e => { e.stopPropagation(); remove(s.id) }}
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
          <Plus size={15} /> {t.addStool}
        </button>
      )}
    </SectionCard>
  )
}

function OccurrenceForm({ draft, setDraft, lang, onSave, onCancel }: {
  draft: StoolOccurrence
  setDraft: (d: StoolOccurrence) => void
  lang: Lang
  onSave: () => void
  onCancel: () => void
}) {
  const t = T[lang]
  return (
    <div className="bg-ink-50">
      <FieldRow label={t.time}>
        <TimeInput value={draft.time} onChange={v => setDraft({ ...draft, time: v })} />
      </FieldRow>
      <div className="px-4 py-3">
        <p className="text-[10px] font-sans font-bold tracking-[0.14em] uppercase text-ink-500 mb-2">{t.bristolSection}</p>
        <div className="flex gap-2 flex-wrap">
          {([1, 2, 3, 4, 5, 6, 7] as BristolType[]).map(b => {
            const sel = draft.bristolType === b
            return (
              <button
                key={b}
                title={t.bristol[b].desc}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-bold transition-all border',
                  sel ? 'bg-accent text-white border-accent' : 'text-ink-500 border-ink-200'
                )}
                onClick={() => setDraft({ ...draft, bristolType: b })}
              >
                {b}
              </button>
            )
          })}
        </div>
        <p className="text-xs font-sans text-ink-400 mt-2">{t.bristol[draft.bristolType].desc}</p>
      </div>
      <div className="px-4 py-3">
        <p className="text-[10px] font-sans font-bold tracking-[0.14em] uppercase text-ink-500 mb-2">{t.urgencySection}</p>
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(t.urgency) as Urgency[]).map(u => {
            const sel = draft.urgency === u
            return (
              <button
                key={u}
                className={cn(
                  'px-3 py-1.5 rounded-full border text-xs font-sans font-semibold transition-all',
                  sel ? 'bg-accent text-white border-accent' : 'text-ink-500 border-ink-200'
                )}
                onClick={() => setDraft({ ...draft, urgency: u })}
              >
                {t.urgency[u].label}
              </button>
            )
          })}
        </div>
      </div>
      <div className="px-4 py-3">
        <p className="text-[10px] font-sans font-bold tracking-[0.14em] uppercase text-ink-500 mb-2">{t.discomfortSection}</p>
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(t.severity) as Severity[]).map(s => {
            const m = t.severity[s]
            const sel = draft.discomfort === s
            return (
              <button
                key={s}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-sans font-semibold transition-all"
                style={{ borderColor: m.color, background: sel ? m.color : 'transparent', color: sel ? '#fff' : m.color }}
                onClick={() => setDraft({ ...draft, discomfort: s })}
              >
                {m.label}
              </button>
            )
          })}
        </div>
      </div>
      <FieldRow label={t.bloodSection}>
        <div className="flex rounded-lg overflow-hidden border border-ink-200">
          <button
            className={cn('px-3 py-1.5 text-xs font-sans font-medium transition-colors', !draft.blood ? 'bg-ink-100 text-ink-DEFAULT' : 'text-ink-400 hover:bg-ink-50')}
            onClick={() => setDraft({ ...draft, blood: false })}
          >
            {t.bloodNo}
          </button>
          <button
            className={cn('px-3 py-1.5 text-xs font-sans font-medium transition-colors', draft.blood ? 'bg-sev-severe text-white' : 'text-ink-400 hover:bg-ink-50')}
            onClick={() => setDraft({ ...draft, blood: true })}
          >
            {t.bloodYes}
          </button>
        </div>
      </FieldRow>
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
