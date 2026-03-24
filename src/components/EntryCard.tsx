import { HeadacheEntry, Lang } from '@/types'
import { T } from '@/i18n'
import { Trash2 } from 'lucide-react'

interface Props {
  entry: HeadacheEntry
  lang: Lang
  onEdit: () => void
  onDelete: () => void
}

export function EntryCard({ entry, lang, onEdit, onDelete }: Props) {
  const t = T[lang]
  const sev = t.severity[entry.severity]
  const typ = t.types[entry.type]
  const d = new Date(entry.date + 'T12:00:00')
  const weekday = t.weekdays[d.getDay()]
  const day = d.getDate()

  return (
    <div
      className="relative flex items-stretch bg-ink-800 rounded-2xl overflow-hidden border border-ink-700/50 active:scale-[0.99] transition-transform cursor-pointer group"
      onClick={onEdit}
    >
      {/* Severity stripe */}
      <div className="w-1 shrink-0" style={{ background: sev.color }} />

      {/* Date block */}
      <div className="flex flex-col items-center justify-center px-4 py-3.5 border-r border-ink-700/50 min-w-[56px]">
        <span className="text-[10px] font-sans font-semibold tracking-widest uppercase text-ink-500">
          {weekday}
        </span>
        <span className="font-serif text-2xl text-ink-100 leading-none mt-0.5">
          {day}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 px-3.5 py-3 min-w-0">
        <div className="text-xs font-sans text-ink-400 tabular-nums mb-2">
          {entry.startTime}{entry.endTime ? ` → ${entry.endTime}` : ''}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span
            className="text-[11px] font-sans font-semibold px-2.5 py-0.5 rounded-full border"
            style={{ color: sev.color, borderColor: sev.color + '40', background: sev.color + '18' }}
          >
            {sev.label}
          </span>
          <span className="text-[11px] font-sans font-medium px-2.5 py-0.5 rounded-full bg-ink-700 text-ink-300 border border-ink-600">
            {typ.num} · {typ.label}
          </span>
        </div>
        {entry.triggers && (
          <p className="text-xs text-ink-500 mt-2 truncate font-sans">{entry.triggers}</p>
        )}
      </div>

      {/* Delete button */}
      <button
        className="flex items-center justify-center px-3.5 text-ink-600 opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity hover:text-[#d95f5f]"
        onClick={e => { e.stopPropagation(); onDelete() }}
        aria-label="Delete"
      >
        <Trash2 size={15} />
      </button>
    </div>
  )
}
