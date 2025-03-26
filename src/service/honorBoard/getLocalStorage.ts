import type { STORAGE_KEYS, TWinner } from "../types";

export const getLocalStorage = (key: STORAGE_KEYS): TWinner[] | null => {
    try {
        const value = localStorage.getItem(key);
        return value ? (JSON.parse(value) as TWinner[]) : null;
    } catch {
        return null;
    }
};
