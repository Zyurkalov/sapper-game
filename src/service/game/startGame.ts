import { createBombs } from "./createBombs";
import createField from "./createField";

type coordinates = {r: number, c: number}

export const startGame = (row: number, column: number, bombs: number) => {

    //if('mobile' && row > column) [row, column] = [column, row]
    row = row < 5 ? 5 : row;
    column = column < 5 ? 5 : column;
    
    const field = createField(row, column)
    const coordBombs: coordinates[] = createBombs(row, column, bombs)
    const coordNumbers: coordinates[] = []

    coordBombs.forEach(({r, c}) => {
        const cell = field[r][c]
        cell.createBomb()
        
        const neighbours = cell.getNeighbours().map(({row, column}) => ({
            r: row, c: column
        }))
        coordNumbers.push(...neighbours)
    });

    coordNumbers.forEach(({r, c})=> {
        const cell = field[r][c]
        cell.createNumber()
    })
    return field
}