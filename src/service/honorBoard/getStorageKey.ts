import { STORAGE_KEYS } from "../types";

export const getStorageKey = (rank: string) => {
    if (rank === "easy") return STORAGE_KEYS.winnersEasy;
    if (rank === "medium") return STORAGE_KEYS.winnersMedium;
    if (rank === "hard") return STORAGE_KEYS.winnersHard;
    return STORAGE_KEYS.winnersCustom;
};
