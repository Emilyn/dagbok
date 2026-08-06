import { useState } from 'react'
import { DayEntry, Lang } from '@/types'
import { T } from '@/i18n'
import { Plus, Menu, X, Globe, FileText, FileJson } from 'lucide-react'
import { DayCard } from './DayCard'
import { exportCsv, exportJson } from '@/lib/exportData'

interface Props {
  days: DayEntry[]
  lang: Lang
  onAdd: () => void
  onOpenDay: (date: string) => void
  onDeleteDay: (date: string) => void
  onToggleLang: () => void
}

function groupByMonth(days: DayEntry[], months: string[]) {
  const map = new Map<string, DayEntry[]>()
  for (const day of days) {
    const d = new Date(day.date + 'T12:00:00')
    const key = `${months[d.getMonth()]} ${d.getFullYear()}`
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(day)
  }
  return Array.from(map.entries()).map(([month, items]) => ({ month, items }))
}

export function ListView({ days, lang, onAdd, onOpenDay, onDeleteDay, onToggleLang }: Props) {
  const t = T[lang]
  const grouped = groupByMonth(days, t.months)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex flex-col h-full bg-ink-900">
      {/* Header */}
      <header className="flex items-end justify-between px-5 pt-[calc(env(safe-area-inset-top,0px)+20px)] pb-4 border-b border-ink-200 bg-ink-900/95 backdrop-blur-sm shrink-0">
        <div>
          <h1 className="font-serif text-2xl font-light tracking-wide text-ink-DEFAULT">
            {t.appTitle}
          </h1>
          <p className="text-xs text-ink-500 mt-0.5 font-sans tracking-widest uppercase">
            {t.subtitle(days.length)}
          </p>
        </div>
        <button
          onClick={() => setMenuOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-full text-ink-500 hover:bg-ink-100 hover:text-ink-DEFAULT transition-colors active:scale-95"
          aria-label="Menu"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* List */}
      <main className="flex-1 overflow-y-auto px-4 pb-24">
        {days.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-8">
            <div className="w-16 h-16 rounded-full bg-ink-100 flex items-center justify-center mb-2">
              <span className="text-2xl text-ink-400">◎</span>
            </div>
            <p className="font-serif text-xl font-light text-ink-400">{t.emptyTitle}</p>
            <p className="text-sm text-ink-500 font-sans">{t.emptySub}</p>
          </div>
        ) : (
          grouped.map(({ month, items }) => (
            <section key={month}>
              <div className="text-[10px] font-sans font-bold tracking-[0.18em] uppercase text-ink-500 px-1 pt-6 pb-2.5">
                {month}
              </div>
              <div className="flex flex-col gap-2.5">
                {items.map((day, i) => (
                  <div
                    key={day.date}
                    className="animate-fade-up"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <DayCard
                      day={day}
                      lang={lang}
                      onOpen={() => onOpenDay(day.date)}
                      onDelete={() => onDeleteDay(day.date)}
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
        className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+24px)] right-5 w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center shadow-xl shadow-accent/25 active:scale-95 transition-all hover:bg-accent-light"
        aria-label="Add entry"
      >
        <Plus size={24} strokeWidth={2.5} />
      </button>

      {/* Menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink-DEFAULT/20 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Slide-in menu panel */}
      <div
        className={`fixed top-0 right-0 h-full z-50 w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        {/* Menu header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-200">
          <span className="font-serif text-lg font-light text-ink-DEFAULT">{t.menuTitle}</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full text-ink-400 hover:bg-ink-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-6">
          {/* Language */}
          <section>
            <p className="text-[10px] font-sans font-bold tracking-[0.18em] uppercase text-ink-400 mb-3">{t.language}</p>
            <button
              onClick={() => { onToggleLang(); setMenuOpen(false) }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-ink-100 hover:bg-ink-200 transition-colors text-left"
            >
              <Globe size={16} className="text-accent shrink-0" />
              <span className="text-sm font-sans text-ink-DEFAULT font-medium">
                {lang === 'sv' ? 'Switch to English' : 'Byt till Svenska'}
              </span>
            </button>
          </section>

          {/* Export */}
          <section>
            <p className="text-[10px] font-sans font-bold tracking-[0.18em] uppercase text-ink-400 mb-3">{t.exportSection}</p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { exportCsv(days); setMenuOpen(false) }}
                disabled={days.length === 0}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-ink-100 hover:bg-ink-200 transition-colors text-left disabled:opacity-40 disabled:pointer-events-none"
              >
                <FileText size={16} className="text-sev-mild shrink-0" />
                <div>
                  <p className="text-sm font-sans text-ink-DEFAULT font-medium">{t.exportCsv}</p>
                  <p className="text-xs font-sans text-ink-400 mt-0.5">{t.exportCsvDesc}</p>
                </div>
              </button>
              <button
                onClick={() => { exportJson(days); setMenuOpen(false) }}
                disabled={days.length === 0}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-ink-100 hover:bg-ink-200 transition-colors text-left disabled:opacity-40 disabled:pointer-events-none"
              >
                <FileJson size={16} className="text-accent shrink-0" />
                <div>
                  <p className="text-sm font-sans text-ink-DEFAULT font-medium">{t.exportJson}</p>
                  <p className="text-xs font-sans text-ink-400 mt-0.5">{t.exportJsonDesc}</p>
                </div>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
