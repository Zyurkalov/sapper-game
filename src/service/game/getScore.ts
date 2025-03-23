import { SCORE_MODIFICATOR } from "../constants";

const getScore  = (score: number, startTime: number, finishTime: number):number => {
    return Math.floor(score *SCORE_MODIFICATOR / ((startTime - finishTime) / 100 ))
}

export default getScore