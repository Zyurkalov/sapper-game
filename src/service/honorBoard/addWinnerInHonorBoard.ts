import type { STORAGE_KEYS, TWinner } from "../types";
import { getLocalStorage } from "./getLocalStorage";
import { setLocalStorage } from "./setLocalStorage";

const addWinnerInHonorBoard = (
    key: STORAGE_KEYS,
    user: { nickname: string; score: number }
) => {
    const winner: Omit<TWinner, "id"> = {
        name: user.nickname,
        score: user.score,
    };

    const winners: TWinner[] = getLocalStorage(key);
    const newArr: TWinner[] = [...winners, winner]
        .sort((a, b) => b.score - a.score)
        .map((item, index) => ({ ...item, id: index }))
        .slice(0, 10);

    setLocalStorage(newArr, key);
};

export default addWinnerInHonorBoard;
