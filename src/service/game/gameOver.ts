import type Cell from "@/classes/cell"
import type { coordinates } from "./startGame"

const gameOver = (value: number | 'bomb' | null, bombs: coordinates[], field: Cell[][]) => {
    if(value === 'bomb') {
        bombs.forEach(({r, c}) => {
            field[r][c].isChecked = true
        });
    }
    return field
}
export default gameOver