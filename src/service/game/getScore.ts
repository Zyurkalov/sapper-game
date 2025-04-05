import {
    TIME_MODIFICATOR,
    BOMBS_MODIFICATOR,
    NEIGHBOR_MODIFICATOR,
} from "../constants";

const getScore = (
    score: number,
    cells: number,
    time: number,
    bombs: number
): number => {
    const timeFactor = TIME_MODIFICATOR / time;
    const difficultFactor = BOMBS_MODIFICATOR * (bombs / cells);
    const extraPoints = NEIGHBOR_MODIFICATOR * (bombs * 8 - score);

    return time
        ? Math.floor(score * timeFactor * difficultFactor + extraPoints)
        : 0;
};

export default getScore;
