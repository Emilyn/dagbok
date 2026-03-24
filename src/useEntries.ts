import { useState, useEffect } from 'react'
import { HeadacheEntry } from './types'

const KEY = 'dagbok_entries'

export function useEntries() {
  const [entries, setEntries] = useState<HeadacheEntry[]>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(entries))
  }, [entries])

  const sorted = (list: HeadacheEntry[]) =>
    [...list].sort((a, b) => b.date.localeCompare(a.date) || b.startTime.localeCompare(a.startTime))

  const addEntry    = (e: HeadacheEntry) => setEntries(p => sorted([e, ...p]))
  const updateEntry = (e: HeadacheEntry) => setEntries(p => sorted(p.map(x => x.id === e.id ? e : x)))
  const deleteEntry = (id: string)       => setEntries(p => p.filter(x => x.id !== id))

  return { entries, addEntry, updateEntry, deleteEntry }
}
