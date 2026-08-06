import { useState } from 'react'
import { Lang } from './types'
import { T } from './i18n'
import { useEntries } from './useEntries'
import { ListView } from './components/ListView'
import { DayView } from './components/DayView'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './components/ui/dialog'
import { Button } from './components/ui/button'

type View = 'list' | 'day'

function today() {
  return new Date().toISOString().slice(0, 10)
}

export default function App() {
  const { days, getDay, saveDay, deleteDay } = useEntries()
  const [view, setView]           = useState<View>('list')
  const [activeDate, setActiveDate] = useState<string | null>(null)
  const [toDelete, setToDelete]   = useState<string | null>(null)
  const [pickingDate, setPickingDate] = useState(false)
  const [pickerDate, setPickerDate]   = useState(today)
  const [lang, setLang]           = useState<Lang>(() =>
    (localStorage.getItem('lang') as Lang) ?? 'sv'
  )

  const toggleLang = () => {
    const next: Lang = lang === 'sv' ? 'en' : 'sv'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  const openDatePicker = () => { setPickerDate(today()); setPickingDate(true) }
  const confirmDatePicker = () => { setActiveDate(pickerDate); setPickingDate(false); setView('day') }
  const openDay = (date: string) => { setActiveDate(date); setView('day') }
  const goBack  = () => { setView('list'); setActiveDate(null) }

  const handleDelete = () => {
    if (toDelete) { deleteDay(toDelete); setToDelete(null) }
  }

  const t = T[lang]

  return (
    <div className="h-full bg-ink-900 font-sans">
      {view === 'list' ? (
        <ListView
          days={days}
          lang={lang}
          onAdd={openDatePicker}
          onOpenDay={openDay}
          onDeleteDay={setToDelete}
          onToggleLang={toggleLang}
        />
      ) : (
        <DayView
          date={activeDate!}
          day={getDay(activeDate!)}
          lang={lang}
          onSave={saveDay}
          onBack={goBack}
        />
      )}

      {/* Date picker */}
      <Dialog open={pickingDate} onOpenChange={open => !open && setPickingDate(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.chooseDateTitle}</DialogTitle>
            <DialogDescription>{t.chooseDateDesc}</DialogDescription>
          </DialogHeader>
          <input
            type="date"
            value={pickerDate}
            onChange={e => setPickerDate(e.target.value)}
            className="w-full bg-ink-100 rounded-xl px-4 py-3 text-base font-sans text-ink-DEFAULT outline-none"
          />
          <div className="flex gap-3 mt-4">
            <Button variant="outline" className="flex-1" onClick={() => setPickingDate(false)}>
              {t.cancel}
            </Button>
            <Button className="flex-1" onClick={confirmDatePicker}>
              {t.openDay}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete day confirmation */}
      <Dialog open={!!toDelete} onOpenChange={open => !open && setToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.deleteDayTitle}</DialogTitle>
            <DialogDescription>{t.deleteDayDesc}</DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-2">
            <Button variant="outline" className="flex-1" onClick={() => setToDelete(null)}>
              {t.cancel}
            </Button>
            <Button variant="destructive" className="flex-1" onClick={handleDelete}>
              {t.confirmDelete}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
