import Cell from "@/classes/cell"

export default function createField (row: number, column: number): Cell[][] {
    const field: Cell[][] = new Array(row).fill(null)
    
    for(let r=0; r<row; r++){
        field[r] = new Array(column).fill(null)
        for(let c=0; c<column; c++){
            field[r][c] = new Cell({row: r, column: c}, {row, column})
        }

    }
    return field
}