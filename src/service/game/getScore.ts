import { SCORE_MODIFICATOR } from "../constants";

const getScore = (score: number, time: number, bombsCount: number): number => {
    const extraPoints = bombsCount * 8 - score;
    return (
        Math.floor(
            score * (1 / (time / 100)) + extraPoints * SCORE_MODIFICATOR
        ) | 0
    );
};

export default getScore;
