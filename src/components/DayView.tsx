import { DayEntry, Lang, emptyDay } from '@/types'
import { T } from '@/i18n'
import { ArrowLeft } from 'lucide-react'
import { HeadacheSection } from '@/components/HeadacheSection'
import { StoolSection } from '@/components/StoolSection'
import { FoodSection } from '@/components/FoodSection'

interface Props {
  date: string
  day: DayEntry | undefined
  lang: Lang
  onSave: (day: DayEntry) => void
  onBack: () => void
}

export function DayView({ date, day, lang, onSave, onBack }: Props) {
  const t = T[lang]
  const current = day ?? emptyDay(date)
  const d = new Date(date + 'T12:00:00')
  const dateLabel = `${t.weekdaysLong[d.getDay()]} ${d.getDate()} ${t.months[d.getMonth()]}`

  return (
    <div className="flex flex-col h-full bg-ink-900">
      <header className="flex items-center justify-between px-4 pt-[calc(env(safe-area-inset-top,0px)+16px)] pb-3.5 border-b border-ink-200 bg-ink-900/95 backdrop-blur-sm shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-ink-400 hover:text-ink-DEFAULT transition-colors p-1 -ml-1"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-sans">{t.back}</span>
        </button>
        <h2 className="font-serif text-lg font-light text-ink-DEFAULT capitalize">
          {dateLabel}
        </h2>
        <div className="w-16" />
      </header>

      <main className="flex-1 overflow-y-auto px-4 pt-5 pb-10">
        <HeadacheSection
          headaches={current.headaches}
          lang={lang}
          onChange={headaches => onSave({ ...current, headaches })}
        />
        <StoolSection
          stools={current.stools}
          lang={lang}
          onChange={stools => onSave({ ...current, stools })}
        />
        <FoodSection
          food={current.food}
          lang={lang}
          onChange={food => onSave({ ...current, food })}
        />
      </main>
    </div>
  )
}
