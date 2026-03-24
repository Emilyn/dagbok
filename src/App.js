import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { T } from './i18n';
import { useEntries } from './useEntries';
import { ListView } from './components/ListView';
import { EntryForm } from './components/EntryForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './components/ui/dialog';
import { Button } from './components/ui/button';
export default function App() {
    const { entries, addEntry, updateEntry, deleteEntry } = useEntries();
    const [view, setView] = useState('list');
    const [editing, setEditing] = useState(null);
    const [toDelete, setToDelete] = useState(null);
    const [lang, setLang] = useState(() => localStorage.getItem('lang') ?? 'sv');
    const toggleLang = () => {
        const next = lang === 'sv' ? 'en' : 'sv';
        setLang(next);
        localStorage.setItem('lang', next);
    };
    const openAdd = () => { setEditing(null); setView('add'); };
    const openEdit = (e) => { setEditing(e); setView('edit'); };
    const goBack = () => { setView('list'); setEditing(null); };
    const handleSave = (e) => {
        view === 'edit' ? updateEntry(e) : addEntry(e);
        goBack();
    };
    const handleDelete = () => {
        if (toDelete) {
            deleteEntry(toDelete);
            setToDelete(null);
        }
    };
    const t = T[lang];
    return (_jsxs("div", { className: "h-full bg-ink-900 font-sans", children: [view === 'list' ? (_jsx(ListView, { entries: entries, lang: lang, onAdd: openAdd, onEdit: openEdit, onDelete: setToDelete, onToggleLang: toggleLang })) : (_jsx(EntryForm, { existing: editing, lang: lang, onSave: handleSave, onBack: goBack })), _jsx(Dialog, { open: !!toDelete, onOpenChange: open => !open && setToDelete(null), children: _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: t.deleteTitle }), _jsx(DialogDescription, { children: t.deleteDesc })] }), _jsxs("div", { className: "flex gap-3 mt-2", children: [_jsx(Button, { variant: "outline", className: "flex-1", onClick: () => setToDelete(null), children: t.cancel }), _jsx(Button, { variant: "destructive", className: "flex-1", onClick: handleDelete, children: t.confirmDelete })] })] }) })] }));
}
