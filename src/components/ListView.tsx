import { HeadacheEntry, Lang } from '@/types'
import { T } from '@/i18n'
import { Button } from '@/components/ui/button'
import { Plus, Globe } from 'lucide-react'
import { EntryCard } from './EntryCard'

interface Props {
  entries: HeadacheEntry[]
  lang: Lang
  onAdd: () => void
  onEdit: (e: HeadacheEntry) => void
  onDelete: (id: string) => void
  onToggleLang: () => void
}

function groupByMonth(entries: HeadacheEntry[], months: string[]) {
  const map = new Map<string, HeadacheEntry[]>()
  for (const e of entries) {
    const d = new Date(e.date + 'T12:00:00')
    const key = `${months[d.getMonth()]} ${d.getFullYear()}`
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(e)
  }
  return Array.from(map.entries()).map(([month, items]) => ({ month, items }))
}

export function ListView({ entries, lang, onAdd, onEdit, onDelete, onToggleLang }: Props) {
  const t = T[lang]
  const grouped = groupByMonth(entries, t.months)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex items-end justify-between px-5 pt-[calc(env(safe-area-inset-top,0px)+20px)] pb-4 border-b border-ink-800 bg-ink-900/95 backdrop-blur-sm shrink-0">
        <div>
          <h1 className="font-serif text-2xl font-light tracking-wide text-ink-100">
            {t.appTitle}
          </h1>
          <p className="text-xs text-ink-500 mt-0.5 font-sans tracking-widest uppercase">
            {t.subtitle(entries.length)}
          </p>
        </div>
        <button
          onClick={onToggleLang}
          className="flex items-center gap-1.5 text-xs font-sans font-semibold tracking-widest text-[#c8a96e] bg-[#c8a96e]/10 border border-[#c8a96e]/25 px-3 py-1.5 rounded-full transition-all hover:bg-[#c8a96e]/20 active:scale-95"
        >
          <Globe size={12} />
          {lang === 'sv' ? 'EN' : 'SV'}
        </button>
      </header>

      {/* List */}
      <main className="flex-1 overflow-y-auto px-4 pb-24">
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-8">
            <div className="w-16 h-16 rounded-full bg-ink-800 flex items-center justify-center mb-2">
              <span className="text-2xl text-ink-600">◎</span>
            </div>
            <p className="font-serif text-xl font-light text-ink-400">{t.emptyTitle}</p>
            <p className="text-sm text-ink-600 font-sans">{t.emptySub}</p>
          </div>
        ) : (
          grouped.map(({ month, items }) => (
            <section key={month}>
              <div className="text-[10px] font-sans font-bold tracking-[0.18em] uppercase text-ink-600 px-1 pt-6 pb-2.5">
                {month}
              </div>
              <div className="flex flex-col gap-2.5">
                {items.map((entry, i) => (
                  <div
                    key={entry.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <EntryCard
                      entry={entry}
                      lang={lang}
                      onEdit={() => onEdit(entry)}
                      onDelete={() => onDelete(entry.id)}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      {/* FAB */}
      <button
        onClick={onAdd}
        className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+24px)] right-5 w-14 h-14 rounded-full bg-[#c8a96e] text-ink-900 flex items-center justify-center shadow-2xl shadow-[#c8a96e]/30 active:scale-95 transition-all hover:bg-[#e8cfa0]"
        aria-label="Add entry"
      >
        <Plus size={24} strokeWidth={2.5} />
      </button>
    </div>
  )
}
