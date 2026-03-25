import { HeadacheEntry } from '@/types'

function downloadFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function exportCsv(entries: HeadacheEntry[]) {
  const header = 'Date,Start,End,Severity,Type,Triggers'
  const rows = entries.map(e =>
    [e.date, e.startTime, e.endTime ?? '', e.severity, e.type, `"${e.triggers.replace(/"/g, '""')}"`].join(',')
  )
  downloadFile([header, ...rows].join('\n'), 'headache-diary.csv', 'text/csv')
}

export function exportJson(entries: HeadacheEntry[]) {
  downloadFile(JSON.stringify(entries, null, 2), 'headache-diary.json', 'application/json')
}
