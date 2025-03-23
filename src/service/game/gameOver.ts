import type Cell from "@/classes/cell"
import type { coordinates } from "./startGame"

export const gameOver = (value: number | 'bomb' | null, bombs: coordinates[], field: Cell[][]) => {
    if(value === 'bomb') {
        bombs.forEach(({r, c}) => {
            field[r][c].isChecked = true
        });
    }
    return field
}