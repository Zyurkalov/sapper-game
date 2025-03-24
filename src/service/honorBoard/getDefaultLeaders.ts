import { DEFAULT_WINNERS } from "../constants";
import type { TWinner } from "../types";

export const getDefaultLeaders = ():TWinner[] => {
    const names = DEFAULT_WINNERS.map(item => item.name);
    const mixNames = [...names].sort(() => Math.random() - 0.5);

    const result = DEFAULT_WINNERS.map((item, index) => ({...item,name: mixNames[index]}));
    return result
} 
