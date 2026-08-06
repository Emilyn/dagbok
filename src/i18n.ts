import { Lang, Severity, HeadacheType, BristolType, Urgency } from './types'

type SevMeta = { label: string; desc: string; color: string; bg: string; ring: string }
type TypeMeta = { label: string; num: number }
type BristolMeta = { label: string; desc: string }
type UrgencyMeta = { label: string }

interface Translations {
  appTitle: string
  subtitle: (n: number) => string
  emptyTitle: string
  emptySub: string
  save: string
  back: string
  chooseDateTitle: string
  chooseDateDesc: string
  openDay: string
  starts: string
  ends: string
  time: string
  optional: string
  headachesSection: string
  addHeadache: string
  noHeadaches: string
  severitySection: string
  typeSection: string
  triggersSection: string
  triggersPlaceholder: string
  stoolsSection: string
  addStool: string
  noStools: string
  bristolSection: string
  urgencySection: string
  urgency: Record<Urgency, UrgencyMeta>
  discomfortSection: string
  bloodSection: string
  bloodYes: string
  bloodNo: string
  mealsSection: string
  breakfast: string
  lunch: string
  dinner: string
  snacks: string
  mealPlaceholder: string
  headacheCount: (n: number) => string
  stoolCount: (n: number) => string
  foodLogged: string
  deleteDayTitle: string
  deleteDayDesc: string
  cancel: string
  confirmDelete: string
  months: string[]
  weekdays: string[]
  weekdaysLong: string[]
  severity: Record<Severity, SevMeta>
  types: Record<HeadacheType, TypeMeta>
  bristol: Record<BristolType, BristolMeta>
  menuTitle: string
  exportSection: string
  exportCsv: string
  exportJson: string
  exportCsvDesc: string
  exportJsonDesc: string
  language: string
}

export const T: Record<Lang, Translations> = {
  sv: {
    appTitle: 'Symptomdagbok',
    subtitle: (n) => `${n} ${n === 1 ? 'dag' : 'dagar'}`,
    emptyTitle: 'Inga dagar loggade ännu',
    emptySub: 'Tryck + för att välja ett datum',
    save: 'Spara',
    back: 'Tillbaka',
    chooseDateTitle: 'Välj datum',
    chooseDateDesc: 'Öppna eller skapa en post för ett datum.',
    openDay: 'Öppna',
    starts: 'Börjar',
    ends: 'Slutar',
    time: 'Tid',
    optional: 'valfri',
    headachesSection: 'Huvudvärk',
    addHeadache: 'Lägg till huvudvärk',
    noHeadaches: 'Ingen huvudvärk loggad denna dag',
    severitySection: 'Huvudvärkens styrka',
    typeSection: 'Typ av huvudvärk',
    triggersSection: 'Utlösande faktorer',
    triggersPlaceholder: 'T.ex. stress, mat, dryck, hormoner, väder...',
    stoolsSection: 'Avföring',
    addStool: 'Lägg till avföring',
    noStools: 'Ingen avföring loggad denna dag',
    bristolSection: 'Konsistens (Bristolskalan)',
    urgencySection: 'Brådska',
    urgency: {
      normal:      { label: 'Normal' },
      urgent:      { label: 'Brådskande' },
      incontinent: { label: 'Kunde inte hålla mig' },
    },
    discomfortSection: 'Obehag/smärta',
    bloodSection: 'Blod i avföringen',
    bloodYes: 'Ja',
    bloodNo: 'Nej',
    mealsSection: 'Måltider',
    breakfast: 'Frukost',
    lunch: 'Lunch',
    dinner: 'Middag',
    snacks: 'Mellanmål',
    mealPlaceholder: 'Vad åt du?',
    headacheCount: (n) => `${n} ${n === 1 ? 'huvudvärk' : 'huvudvärkar'}`,
    stoolCount: (n) => `${n} ${n === 1 ? 'tarmtömning' : 'tarmtömningar'}`,
    foodLogged: 'Mat loggad',
    deleteDayTitle: 'Ta bort dag',
    deleteDayDesc: 'Alla poster för denna dag tas bort. Denna åtgärd kan inte ångras.',
    cancel: 'Avbryt',
    confirmDelete: 'Ta bort',
    menuTitle: 'Meny',
    exportSection: 'Exportera data',
    exportCsv: 'Exportera CSV',
    exportJson: 'Exportera JSON',
    exportCsvDesc: 'Öppna i Excel eller Numbers',
    exportJsonDesc: 'Fullständig säkerhetskopia',
    language: 'Språk',
    months: ['januari','februari','mars','april','maj','juni','juli','augusti','september','oktober','november','december'],
    weekdays: ['Sön','Mån','Tis','Ons','Tor','Fre','Lör'],
    weekdaysLong: ['Söndag','Måndag','Tisdag','Onsdag','Torsdag','Fredag','Lördag'],
    severity: {
      latt:  { label: 'Lätt',  desc: 'Hämmar inte skola/arbete/aktiviteter',                  color: '#5cb87a', bg: 'bg-[#5cb87a]/10', ring: 'ring-[#5cb87a]' },
      medel: { label: 'Medel', desc: 'Hämmar, men förhindrar inte skola/arbete/aktiviteter',  color: '#e8a838', bg: 'bg-[#e8a838]/10', ring: 'ring-[#e8a838]' },
      svar:  { label: 'Svår',  desc: 'Förhindrar skola/arbete/aktiviteter',                   color: '#d95f5f', bg: 'bg-[#d95f5f]/10', ring: 'ring-[#d95f5f]' },
    },
    types: {
      migran:    { label: 'Migrän',             num: 1 },
      spannings: { label: 'Spänningshuvudvärk', num: 2 },
      kluster:   { label: 'Klusterhuvudvärk',   num: 3 },
      annan:     { label: 'Annan huvudvärk',     num: 4 },
    },
    bristol: {
      1: { label: 'Typ 1', desc: 'Hårda klumpar, svårt att få ut (svår förstoppning)' },
      2: { label: 'Typ 2', desc: 'Korvformad men klumpig' },
      3: { label: 'Typ 3', desc: 'Korvformad med sprickor på ytan' },
      4: { label: 'Typ 4', desc: 'Slät och mjuk, korv-/ormliknande (normal)' },
      5: { label: 'Typ 5', desc: 'Mjuka klumpar med tydliga kanter' },
      6: { label: 'Typ 6', desc: 'Grötig konsistens med ludna kanter' },
      7: { label: 'Typ 7', desc: 'Vattnig, inga fasta bitar (diarré)' },
    },
  },
  en: {
    appTitle: 'Symptom Diary',
    subtitle: (n) => `${n} ${n === 1 ? 'day' : 'days'}`,
    emptyTitle: 'No days logged yet',
    emptySub: 'Tap + to pick a date',
    save: 'Save',
    back: 'Back',
    chooseDateTitle: 'Choose a date',
    chooseDateDesc: 'Open or create an entry for a date.',
    openDay: 'Open',
    starts: 'Starts',
    ends: 'Ends',
    time: 'Time',
    optional: 'optional',
    headachesSection: 'Headache',
    addHeadache: 'Add headache',
    noHeadaches: 'No headaches logged this day',
    severitySection: 'Headache severity',
    typeSection: 'Headache type',
    triggersSection: 'Triggers',
    triggersPlaceholder: 'E.g. stress, food, drink, hormones, weather...',
    stoolsSection: 'Stool',
    addStool: 'Add stool',
    noStools: 'No stool logged this day',
    bristolSection: 'Consistency (Bristol scale)',
    urgencySection: 'Urgency',
    urgency: {
      normal:      { label: 'Normal' },
      urgent:      { label: 'Urgent' },
      incontinent: { label: "Couldn't hold it" },
    },
    discomfortSection: 'Discomfort / pain',
    bloodSection: 'Blood in stool',
    bloodYes: 'Yes',
    bloodNo: 'No',
    mealsSection: 'Meals',
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snacks: 'Snacks',
    mealPlaceholder: 'What did you eat?',
    headacheCount: (n) => `${n} ${n === 1 ? 'headache' : 'headaches'}`,
    stoolCount: (n) => `${n} ${n === 1 ? 'bowel movement' : 'bowel movements'}`,
    foodLogged: 'Food logged',
    deleteDayTitle: 'Delete day',
    deleteDayDesc: 'Everything logged for this day will be removed. This action cannot be undone.',
    cancel: 'Cancel',
    confirmDelete: 'Delete',
    menuTitle: 'Menu',
    exportSection: 'Export data',
    exportCsv: 'Export CSV',
    exportJson: 'Export JSON',
    exportCsvDesc: 'Open in Excel or Numbers',
    exportJsonDesc: 'Full backup',
    language: 'Language',
    months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    weekdays: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    weekdaysLong: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    severity: {
      latt:  { label: 'Mild',     desc: 'Does not hinder school/work/activities',              color: '#5cb87a', bg: 'bg-[#5cb87a]/10', ring: 'ring-[#5cb87a]' },
      medel: { label: 'Moderate', desc: 'Hinders but does not prevent school/work/activities', color: '#e8a838', bg: 'bg-[#e8a838]/10', ring: 'ring-[#e8a838]' },
      svar:  { label: 'Severe',   desc: 'Prevents school/work/activities',                     color: '#d95f5f', bg: 'bg-[#d95f5f]/10', ring: 'ring-[#d95f5f]' },
    },
    types: {
      migran:    { label: 'Migraine',         num: 1 },
      spannings: { label: 'Tension headache', num: 2 },
      kluster:   { label: 'Cluster headache', num: 3 },
      annan:     { label: 'Other headache',   num: 4 },
    },
    bristol: {
      1: { label: 'Type 1', desc: 'Separate hard lumps (severe constipation)' },
      2: { label: 'Type 2', desc: 'Sausage-shaped but lumpy' },
      3: { label: 'Type 3', desc: 'Sausage shape with cracks on the surface' },
      4: { label: 'Type 4', desc: 'Smooth, soft sausage or snake (normal)' },
      5: { label: 'Type 5', desc: 'Soft blobs with clear-cut edges' },
      6: { label: 'Type 6', desc: 'Mushy consistency with ragged edges' },
      7: { label: 'Type 7', desc: 'Watery, no solid pieces (diarrhea)' },
    },
  },
}
