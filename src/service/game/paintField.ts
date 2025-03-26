
export default function paintField (row: number, column: number): null[][] {
    const field: null[][] = new Array(row).fill(null)
    
    for(let r=0; r<row; r++){
        field[r] = new Array(column).fill(null)
        for(let c=0; c<column; c++){
            field[r][c] = null
        }

    }
    return field
}