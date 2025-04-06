export type TWinner = {
    id: number;
    // place: number;
    name: string;
    score: number;
};
export type TUser = { name: string; score: number };
export type TRank = "easy" | "medium" | "hard" | "custom";

export enum STORAGE_KEYS {
    winner = "gameSapper-winner",
    winnersEasy = "gameSapper-winners-easy",
    winnersMedium = "gameSapper-winners-medium",
    winnersHard = "gameSapper-winners-hard",
    winnersCustom = "gameSapper-winners-custom",
}
export const storageKey: Record<TRank, STORAGE_KEYS> = {
    easy: STORAGE_KEYS.winnersEasy,
    medium: STORAGE_KEYS.winnersMedium,
    hard: STORAGE_KEYS.winnersHard,
    custom: STORAGE_KEYS.winnersCustom,
};
