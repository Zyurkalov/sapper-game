export type TWinner = { id: number, place: number, name: string, score: number}
export type TRank = 'easy' | 'medium' | 'hard' | 'custom' 

export enum STORAGE_KEYS {
    winner = 'gameSapper-winner',
    winnersEasy = 'gameSapper-winners-easy',
    winnersMedium = 'gameSapper-winners-medium',
    winnersHard = 'gameSapper-winners-hard',
    winnersCustom = 'gameSapper-winners-custom',
  }
