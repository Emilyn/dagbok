import { useState, useEffect } from 'react';
const KEY = 'dagbok_entries';
export function useEntries() {
    const [entries, setEntries] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(KEY) ?? '[]');
        }
        catch {
            return [];
        }
    });
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(entries));
    }, [entries]);
    const sorted = (list) => [...list].sort((a, b) => b.date.localeCompare(a.date) || b.startTime.localeCompare(a.startTime));
    const addEntry = (e) => setEntries(p => sorted([e, ...p]));
    const updateEntry = (e) => setEntries(p => sorted(p.map(x => x.id === e.id ? e : x)));
    const deleteEntry = (id) => setEntries(p => p.filter(x => x.id !== id));
    return { entries, addEntry, updateEntry, deleteEntry };
}
