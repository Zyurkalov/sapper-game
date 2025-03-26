import type { TWinner } from "../types";
import { getLocalStorage } from "./getLocalStorage";
import { setLocalStorage } from "./setLocalStorage";
import { v4 as uuidv4 } from "uuid";

const addWinnerInHonorBoard = (
    key: string,
    user: { nickname: string; score: number }
) => {
    const winner: TWinner = {};
    winner.id = uuidv4();
    winner.place = 0;
    winner.name = user.nickname;
    winner.score = user.score;

    const winners: TWinner[] = getLocalStorage(key) || [];
    const newArr: TWinner[] = [...winners, winner]
        .sort((a, b) => b.score - a.score)
        .map((item, index) => ({ ...item, place: index + 1 }))
        .slice(0, 10);

    setLocalStorage(newArr, key);
};

export default addWinnerInHonorBoard;
