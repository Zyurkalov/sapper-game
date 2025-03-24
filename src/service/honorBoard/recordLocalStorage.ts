import type { STORAGE_KEYS } from "../types";

export const recordLocalStorage = (data: unknown, rang?: STORAGE_KEYS): void => {
    try {
        if (isWinner(data)) {
            localStorage.setItem('gameSapper-winner', JSON.stringify(data));
            return;
        }
        if (isWinnersArray(data) && rang) {
            localStorage.setItem(rang, JSON.stringify(data));
            return;
        }
    } catch (error) {
       throw new Error(`ошибка записи в localStorage - message: ${error}`)
    }
};

const isWinner = (data: unknown): boolean => {
    return typeof data === 'object' && data !== null &&
           'id' in data && 'name' in data && 'score' in data;
};
const isWinnersArray = (data: unknown): boolean => {
    return Array.isArray(data) && data.every(isWinner);
};