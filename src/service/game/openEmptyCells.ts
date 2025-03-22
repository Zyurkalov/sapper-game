import type Cell from "@/classes/cell";

export default function openEmptyCells(cells: Cell[][], firstCell: Cell): Cell[][] {
    const queue: [number, number][] = [];

    firstCell.getNeighbours().forEach(data => {
        queue.push([data.row, data.column]);
    });

    while (queue.length > 0) {
        const [row, column] = queue.shift()
        const cell = cells[row][column];
        const value = cell.getValue()
        const isNumber = typeof value === 'number'

        if (value === null || isNumber && !cell.getIsChecked()) {
            cell.openCell();

            if(!isNumber){
                const neighbours = cell.getNeighbours();
                neighbours.forEach(coords => {
                    const target = cells[coords.row][coords.column];
                    if (!target.getIsChecked()) queue.push([coords.row, coords.column]);
                });
            }
        }
    }

    return cells;
}