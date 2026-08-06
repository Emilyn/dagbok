import { useState } from 'react'
import { FoodInfo, Lang } from '@/types'
import { T } from '@/i18n'
import { Button } from '@/components/ui/button'
import { SectionCard } from '@/components/FormPrimitives'
import { Check } from 'lucide-react'

interface Props {
  food: FoodInfo
  lang: Lang
  onChange: (food: FoodInfo) => void
}

export function FoodSection({ food, lang, onChange }: Props) {
  const t = T[lang]
  const [draft, setDraft] = useState(food)
  const dirty = draft.breakfast !== food.breakfast || draft.lunch !== food.lunch
    || draft.dinner !== food.dinner || draft.snacks !== food.snacks

  const handleSave = () => {
    const trimmed = {
      breakfast: draft.breakfast.trim(), lunch: draft.lunch.trim(),
      dinner: draft.dinner.trim(), snacks: draft.snacks.trim(),
    }
    setDraft(trimmed)
    onChange(trimmed)
  }

  return (
    <SectionCard title={t.mealsSection}>
      {([
        ['breakfast', t.breakfast, draft.breakfast, (v: string) => setDraft({ ...draft, breakfast: v })],
        ['lunch', t.lunch, draft.lunch, (v: string) => setDraft({ ...draft, lunch: v })],
        ['dinner', t.dinner, draft.dinner, (v: string) => setDraft({ ...draft, dinner: v })],
        ['snacks', t.snacks, draft.snacks, (v: string) => setDraft({ ...draft, snacks: v })],
      ] as const).map(([key, label, value, setValue]) => (
        <div key={key} className="px-4 py-3">
          <p className="text-xs font-sans font-semibold text-ink-500 mb-1.5">{label}</p>
          <textarea
            className="w-full bg-transparent text-sm font-sans text-ink-DEFAULT placeholder:text-ink-300 outline-none resize-none leading-relaxed"
            placeholder={t.mealPlaceholder}
            value={value}
            onChange={e => setValue(e.target.value)}
            rows={2}
          />
        </div>
      ))}
      {dirty && (
        <div className="flex justify-end px-4 py-3">
          <Button size="sm" className="gap-1.5" onClick={handleSave}>
            <Check size={14} /> {t.save}
          </Button>
        </div>
      )}
    </SectionCard>
  )
}
