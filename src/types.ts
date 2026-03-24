export type Severity = 'latt' | 'medel' | 'svar'
export type HeadacheType = 'migran' | 'spannings' | 'kluster' | 'annan'
export type Lang = 'sv' | 'en'

export interface HeadacheEntry {
  id: string
  date: string
  startTime: string
  endTime?: string
  severity: Severity
  type: HeadacheType
  triggers: string
}
