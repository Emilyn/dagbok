import { useState } from 'react'
import { HeadacheEntry, Lang } from './types'
import { T } from './i18n'
import { useEntries } from './useEntries'
import { ListView } from './components/ListView'
import { EntryForm } from './components/EntryForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './components/ui/dialog'
import { Button } from './components/ui/button'

type View = 'list' | 'add' | 'edit'

export default function App() {
  const { entries, addEntry, updateEntry, deleteEntry } = useEntries()
  const [view, setView]         = useState<View>('list')
  const [editing, setEditing]   = useState<HeadacheEntry | null>(null)
  const [toDelete, setToDelete] = useState<string | null>(null)
  const [lang, setLang]         = useState<Lang>(() =>
    (localStorage.getItem('lang') as Lang) ?? 'sv'
  )

  const toggleLang = () => {
    const next: Lang = lang === 'sv' ? 'en' : 'sv'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  const openAdd  = () => { setEditing(null); setView('add') }
  const openEdit = (e: HeadacheEntry) => { setEditing(e); setView('edit') }
  const goBack   = () => { setView('list'); setEditing(null) }

  const handleSave = (e: HeadacheEntry) => {
    view === 'edit' ? updateEntry(e) : addEntry(e)
    goBack()
  }

  const handleDelete = () => {
    if (toDelete) { deleteEntry(toDelete); setToDelete(null) }
  }

  const t = T[lang]

  return (
    <div className="h-full bg-ink-900 font-sans">
      {view === 'list' ? (
        <ListView
          entries={entries}
          lang={lang}
          onAdd={openAdd}
          onEdit={openEdit}
          onDelete={setToDelete}
          onToggleLang={toggleLang}
        />
      ) : (
        <EntryForm
          existing={editing}
          lang={lang}
          onSave={handleSave}
          onBack={goBack}
        />
      )}

      <Dialog open={!!toDelete} onOpenChange={open => !open && setToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.deleteTitle}</DialogTitle>
            <DialogDescription>{t.deleteDesc}</DialogDescription>
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
