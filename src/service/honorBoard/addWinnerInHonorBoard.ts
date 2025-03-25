import type { TUser, TWinner } from "../types"
import { getLocalStorage } from "./getLocalStorage"
import { setLocalStorage } from "./setLocalStorage";

const addWinnerInHonorBoard = (key, user: {nickname: string, score: number}) => {
    const winner: TWinner = {}
    winner.id = Number(new Date());
    winner.place = 0
    winner.name  = user.nickname
    winner.score = user.score

    
    const winners: TWinner[] = getLocalStorage(key) || [];
    const newArr: TWinner[] = [...winners, winner]
        .sort((a, b) => b.score - a.score) 
        .map((item, index) => ({ ...item, place: index + 1 }))
        .slice(0, 10);
    
    setLocalStorage(newArr, key);
}

export default addWinnerInHonorBoard
