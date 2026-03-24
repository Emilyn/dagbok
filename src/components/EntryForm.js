import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { T } from '@/i18n';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
function FieldRow({ label, children }) {
    return (_jsxs("div", { className: "flex items-center justify-between py-3.5 px-4", children: [_jsx("span", { className: "text-sm font-sans text-ink-400", children: label }), children] }));
}
function SectionCard({ title, children }) {
    return (_jsxs("div", { className: "mb-5", children: [_jsx("p", { className: "text-[10px] font-sans font-bold tracking-[0.18em] uppercase text-ink-600 px-1 mb-2", children: title }), _jsx("div", { className: "bg-ink-800 rounded-2xl border border-ink-700/50 overflow-hidden divide-y divide-ink-700/50", children: children })] }));
}
export function EntryForm({ existing, lang, onSave, onBack }) {
    const t = T[lang];
    const today = new Date().toISOString().slice(0, 10);
    const nowTime = new Date().toTimeString().slice(0, 5);
    const [date, setDate] = useState(existing?.date ?? today);
    const [startTime, setStartTime] = useState(existing?.startTime ?? nowTime);
    const [endTime, setEndTime] = useState(existing?.endTime ?? '');
    const [severity, setSeverity] = useState(existing?.severity ?? 'latt');
    const [type, setType] = useState(existing?.type ?? 'migran');
    const [triggers, setTriggers] = useState(existing?.triggers ?? '');
    const handleSave = () => {
        onSave({ id: existing?.id ?? uuidv4(), date, startTime, endTime: endTime || undefined, severity, type, triggers: triggers.trim() });
    };
    return (_jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("header", { className: "flex items-center justify-between px-4 pt-[calc(env(safe-area-inset-top,0px)+16px)] pb-3.5 border-b border-ink-800 bg-ink-900/95 backdrop-blur-sm shrink-0", children: [_jsxs("button", { onClick: onBack, className: "flex items-center gap-1.5 text-ink-400 hover:text-ink-100 transition-colors p-1 -ml-1", children: [_jsx(ArrowLeft, { size: 18 }), _jsx("span", { className: "text-sm font-sans", children: t.back })] }), _jsx("h2", { className: "font-serif text-lg font-light text-ink-100", children: existing ? t.editEntry : t.newEntry }), _jsxs(Button, { size: "sm", onClick: handleSave, className: "gap-1.5", children: [_jsx(Check, { size: 14 }), t.save] })] }), _jsxs("main", { className: "flex-1 overflow-y-auto px-4 pt-5 pb-10", children: [_jsxs(SectionCard, { title: t.dateSection, children: [_jsx(FieldRow, { label: t.date, children: _jsx("input", { type: "date", value: date, onChange: e => setDate(e.target.value), className: "bg-transparent text-sm font-sans text-ink-100 text-right outline-none" }) }), _jsx(FieldRow, { label: t.starts, children: _jsx("input", { type: "time", value: startTime, onChange: e => setStartTime(e.target.value), className: "bg-transparent text-sm font-sans font-medium text-ink-100 text-right outline-none tabular-nums" }) }), _jsx(FieldRow, { label: _jsxs(_Fragment, { children: [t.ends, " ", _jsx("span", { className: "text-[10px] text-ink-600 ml-1.5 tracking-wider uppercase", children: t.optional })] }), children: _jsx("input", { type: "time", value: endTime, onChange: e => setEndTime(e.target.value), className: "bg-transparent text-sm font-sans font-medium text-ink-100 text-right outline-none tabular-nums" }) })] }), _jsx(SectionCard, { title: t.severitySection, children: Object.keys(t.severity).map(s => {
                            const m = t.severity[s];
                            const sel = severity === s;
                            return (_jsxs("button", { className: cn('w-full flex items-center gap-3.5 px-4 py-3.5 text-left transition-colors', sel ? 'bg-ink-700/40' : 'hover:bg-ink-700/20'), onClick: () => setSeverity(s), children: [_jsx("div", { className: "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all", style: { borderColor: m.color, background: sel ? m.color : 'transparent' }, children: sel && _jsx(Check, { size: 11, className: "text-ink-900", strokeWidth: 3 }) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-sans font-semibold", style: { color: sel ? m.color : '#d6d3d1' }, children: m.label }), _jsx("span", { className: "text-xs font-sans text-ink-500 mt-0.5", children: m.desc })] })] }, s));
                        }) }), _jsx(SectionCard, { title: t.typeSection, children: Object.keys(t.types).map(tp => {
                            const m = t.types[tp];
                            const sel = type === tp;
                            return (_jsxs("button", { className: cn('w-full flex items-center gap-3.5 px-4 py-3.5 text-left transition-colors', sel ? 'bg-ink-700/40' : 'hover:bg-ink-700/20'), onClick: () => setType(tp), children: [_jsx("div", { className: cn('w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-sans font-bold transition-all', sel ? 'bg-[#c8a96e] text-ink-900' : 'bg-ink-700 text-ink-400'), children: m.num }), _jsx("span", { className: cn('text-sm font-sans', sel ? 'text-[#c8a96e] font-semibold' : 'text-ink-300 font-normal'), children: m.label })] }, tp));
                        }) }), _jsx(SectionCard, { title: t.triggersSection, children: _jsx("div", { className: "px-4 py-3", children: _jsx("textarea", { className: "w-full bg-transparent text-sm font-sans text-ink-100 placeholder:text-ink-600 outline-none resize-none leading-relaxed", placeholder: t.triggersPlaceholder, value: triggers, onChange: e => setTriggers(e.target.value), rows: 4 }) }) })] })] }));
}
