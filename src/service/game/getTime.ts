import { TIME_MODIFICATOR } from "../constants"

const getTime = (row: number, column: number) => {
    return row * column * TIME_MODIFICATOR
}

export default getTime