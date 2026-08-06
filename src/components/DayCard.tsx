import { DayEntry, Lang, severityRank } from '@/types'
import { T } from '@/i18n'
import { Trash2 } from 'lucide-react'

interface Props {
  day: DayEntry
  lang: Lang
  onOpen: () => void
  onDelete: () => void
}

const NEUTRAL_COLOR = '#3b82b0'

export function DayCard({ day, lang, onOpen, onDelete }: Props) {
  const t = T[lang]
  const d = new Date(day.date + 'T12:00:00')
  const weekday = t.weekdays[d.getDay()]
  const dayNum = d.getDate()

  const hasFood = !!(day.food.breakfast || day.food.lunch || day.food.dinner || day.food.snacks)
  const parts = [
    day.headaches.length > 0 && t.headacheCount(day.headaches.length),
    day.stools.length > 0 && t.stoolCount(day.stools.length),
    hasFood && t.foodLogged,
  ].filter((p): p is string => !!p)

  const worstSeverity = [
    ...day.headaches.map(h => h.severity),
    ...day.stools.map(s => s.discomfort),
  ].sort((a, b) => severityRank(b) - severityRank(a))[0]
  const stripeColor = worstSeverity ? t.severity[worstSeverity].color : NEUTRAL_COLOR

  return (
    <div
      className="relative flex items-stretch bg-white rounded-2xl overflow-hidden border border-ink-200 active:scale-[0.99] transition-transform cursor-pointer group shadow-sm"
      onClick={onOpen}
    >
      <div className="w-1 shrink-0" style={{ background: stripeColor }} />

      <div className="flex flex-col items-center justify-center px-4 py-3.5 border-r border-ink-200 min-w-[56px]">
        <span className="text-[10px] font-sans font-semibold tracking-widest uppercase text-ink-400">
          {weekday}
        </span>
        <span className="font-serif text-2xl text-ink-DEFAULT leading-none mt-0.5">
          {dayNum}
        </span>
      </div>

      <div className="flex-1 px-3.5 py-3 min-w-0 flex items-center">
        <p className="text-sm font-sans text-ink-DEFAULT">{parts.join(' · ')}</p>
      </div>

      <button
        className="flex items-center justify-center px-3.5 text-ink-300 opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity hover:text-sev-severe"
        onClick={e => { e.stopPropagation(); onDelete() }}
        aria-label="Delete"
      >
        <Trash2 size={15} />
      </button>
    </div>
  )
}
