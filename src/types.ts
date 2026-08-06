export type Severity = 'latt' | 'medel' | 'svar'
export type HeadacheType = 'migran' | 'spannings' | 'kluster' | 'annan'
export type Lang = 'sv' | 'en'
export type BristolType = 1 | 2 | 3 | 4 | 5 | 6 | 7
export type Urgency = 'normal' | 'urgent' | 'incontinent'

export interface HeadacheOccurrence {
  id: string
  startTime: string
  endTime?: string
  severity: Severity
  type: HeadacheType
  triggers: string
}

export interface StoolOccurrence {
  id: string
  time: string
  bristolType: BristolType
  urgency: Urgency
  discomfort: Severity
  blood: boolean
}

export interface FoodInfo {
  breakfast: string
  lunch: string
  dinner: string
  snacks: string
}

// One record per date — headaches/stools hold every occurrence logged that day.
export interface DayEntry {
  date: string
  headaches: HeadacheOccurrence[]
  stools: StoolOccurrence[]
  food: FoodInfo
}

export function emptyDay(date: string): DayEntry {
  return { date, headaches: [], stools: [], food: { breakfast: '', lunch: '', dinner: '', snacks: '' } }
}

export function isEmptyDay(day: DayEntry): boolean {
  return day.headaches.length === 0 && day.stools.length === 0
    && !day.food.breakfast && !day.food.lunch && !day.food.dinner && !day.food.snacks
}

export function severityRank(s: Severity): number {
  return s === 'svar' ? 2 : s === 'medel' ? 1 : 0
}
