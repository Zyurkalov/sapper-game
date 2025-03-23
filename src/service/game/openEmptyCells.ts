import type Cell from "@/classes/cell";

export default function openEmptyCells(cells: Cell[][], firstCell: Cell): {cells: Cell[][], openedCells: number} {
    const queue: [number, number][] = [];
    let openedCells = 1

    firstCell.getNeighbours().forEach(data => {
        queue.push([data.row, data.column]);
    });

    while (queue.length > 0) {
        const [row, column] = queue.shift()
        const cell = cells[row][column];

        if(cell.getIsChecked()) continue

        const value = cell.getValue()
        cell.openCell();
        openedCells++

        if (value === null) {
            const neighbours = cell.getNeighbours();
            neighbours.forEach(coords => {
                const target = cells[coords.row][coords.column];
                if (!target.getIsChecked()) {
                    queue.push([coords.row, coords.column]);
                }
            });
        }
    }
    return {cells, openedCells};
}