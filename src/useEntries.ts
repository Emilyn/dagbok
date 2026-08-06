import { useState, useEffect } from 'react'
import { DayEntry, emptyDay, isEmptyDay } from './types'

const KEY = 'dagbok_entries'

interface LegacyEntry {
  id: string
  kind?: 'headache' | 'stool' | 'food'
  date: string
  startTime?: string
  endTime?: string
  severity?: string
  type?: string
  triggers?: string
  time?: string
  bristolType?: number
  urgency?: string
  discomfort?: string
  blood?: boolean
  breakfast?: string
  lunch?: string
  dinner?: string
  snacks?: string
}

function migrate(raw: unknown): DayEntry[] {
  if (!Array.isArray(raw) || raw.length === 0) return []
  if ('headaches' in (raw[0] as object)) return raw as DayEntry[]

  const byDate = new Map<string, DayEntry>()
  for (const e of raw as LegacyEntry[]) {
    const day = byDate.get(e.date) ?? emptyDay(e.date)
    const kind = e.kind ?? 'headache'
    if (kind === 'headache') {
      day.headaches.push({
        id: e.id, startTime: e.startTime!, endTime: e.endTime,
        severity: e.severity as DayEntry['headaches'][number]['severity'],
        type: e.type as DayEntry['headaches'][number]['type'],
        triggers: e.triggers ?? '',
      })
    } else if (kind === 'stool') {
      day.stools.push({
        id: e.id, time: e.time!, bristolType: e.bristolType as DayEntry['stools'][number]['bristolType'],
        urgency: e.urgency as DayEntry['stools'][number]['urgency'],
        discomfort: e.discomfort as DayEntry['stools'][number]['discomfort'],
        blood: e.blood ?? false,
      })
    } else {
      day.food = { breakfast: e.breakfast ?? '', lunch: e.lunch ?? '', dinner: e.dinner ?? '', snacks: e.snacks ?? '' }
    }
    byDate.set(e.date, day)
  }
  return Array.from(byDate.values())
}

export function useEntries() {
  const [days, setDays] = useState<DayEntry[]>(() => {
    try { return migrate(JSON.parse(localStorage.getItem(KEY) ?? '[]')) } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(days))
  }, [days])

  const sorted = (list: DayEntry[]) => [...list].sort((a, b) => b.date.localeCompare(a.date))

  const getDay = (date: string) => days.find(d => d.date === date)

  const saveDay = (day: DayEntry) => setDays(p => {
    const rest = p.filter(d => d.date !== day.date)
    return isEmptyDay(day) ? sorted(rest) : sorted([day, ...rest])
  })

  const deleteDay = (date: string) => setDays(p => p.filter(d => d.date !== date))

  return { days, getDay, saveDay, deleteDay }
}
