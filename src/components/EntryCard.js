import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { T } from '@/i18n';
import { Trash2 } from 'lucide-react';
export function EntryCard({ entry, lang, onEdit, onDelete }) {
    const t = T[lang];
    const sev = t.severity[entry.severity];
    const typ = t.types[entry.type];
    const d = new Date(entry.date + 'T12:00:00');
    const weekday = t.weekdays[d.getDay()];
    const day = d.getDate();
    return (_jsxs("div", { className: "relative flex items-stretch bg-white rounded-2xl overflow-hidden border border-ink-200 active:scale-[0.99] transition-transform cursor-pointer group shadow-sm", onClick: onEdit, children: [_jsx("div", { className: "w-1 shrink-0", style: { background: sev.color } }), _jsxs("div", { className: "flex flex-col items-center justify-center px-4 py-3.5 border-r border-ink-200 min-w-[56px]", children: [_jsx("span", { className: "text-[10px] font-sans font-semibold tracking-widest uppercase text-ink-400", children: weekday }), _jsx("span", { className: "font-serif text-2xl text-ink-DEFAULT leading-none mt-0.5", children: day })] }), _jsxs("div", { className: "flex-1 px-3.5 py-3 min-w-0", children: [_jsxs("div", { className: "text-xs font-sans text-ink-400 tabular-nums mb-2", children: [entry.startTime, entry.endTime ? ` → ${entry.endTime}` : ''] }), _jsxs("div", { className: "flex flex-wrap gap-1.5", children: [_jsx("span", { className: "text-[11px] font-sans font-semibold px-2.5 py-0.5 rounded-full border", style: { color: sev.color, borderColor: sev.color + '40', background: sev.color + '18' }, children: sev.label }), _jsxs("span", { className: "text-[11px] font-sans font-medium px-2.5 py-0.5 rounded-full bg-ink-100 text-ink-500 border border-ink-200", children: [typ.num, " \u00B7 ", typ.label] })] }), entry.triggers && (_jsx("p", { className: "text-xs text-ink-400 mt-2 truncate font-sans", children: entry.triggers }))] }), _jsx("button", { className: "flex items-center justify-center px-3.5 text-ink-300 opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity hover:text-sev-severe", onClick: e => { e.stopPropagation(); onDelete(); }, "aria-label": "Delete", children: _jsx(Trash2, { size: 15 }) })] }));
}
