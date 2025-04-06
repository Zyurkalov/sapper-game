import { DEFAULT_WINNERS } from "../constants";
import type { STORAGE_KEYS, TWinner } from "../types";

export const getLocalStorage = (key: STORAGE_KEYS): TWinner[] => {
    try {
        const value = localStorage.getItem(key);
        return value ? (JSON.parse(value) as TWinner[]) : DEFAULT_WINNERS;
    } catch {
        return DEFAULT_WINNERS;
    }
};
