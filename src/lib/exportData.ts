import { DayEntry } from '@/types'

function downloadFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function csvField(value: string) {
  return `"${value.replace(/"/g, '""')}"`
}

export function exportCsv(days: DayEntry[]) {
  const header = 'Kind,Date,StartTime,EndTime,Severity,Type,Triggers,Time,BristolType,Urgency,Discomfort,Blood,Breakfast,Lunch,Dinner,Snacks'
  const rows: string[] = []
  for (const day of days) {
    for (const h of day.headaches) {
      rows.push(['headache', day.date, h.startTime, h.endTime ?? '', h.severity, h.type, csvField(h.triggers), '', '', '', '', '', '', '', '', ''].join(','))
    }
    for (const s of day.stools) {
      rows.push(['stool', day.date, '', '', '', '', '', s.time, s.bristolType, s.urgency, s.discomfort, s.blood, '', '', '', ''].join(','))
    }
    const { breakfast, lunch, dinner, snacks } = day.food
    if (breakfast || lunch || dinner || snacks) {
      rows.push(['food', day.date, '', '', '', '', '', '', '', '', '', '', csvField(breakfast), csvField(lunch), csvField(dinner), csvField(snacks)].join(','))
    }
  }
  downloadFile([header, ...rows].join('\n'), 'symptom-diary.csv', 'text/csv')
}

export function exportJson(days: DayEntry[]) {
  downloadFile(JSON.stringify(days, null, 2), 'symptom-diary.json', 'application/json')
}
