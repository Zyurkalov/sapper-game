import type Cell from "@/classes/cell";
import type { Ref } from "vue";

export default function openEmptyCells(
    cells: Ref<Cell[][]>,
    targetCell: Cell,
    allGoodCells: Ref<number>,
    countBombs: Ref<number>
) {
    const queue: [number, number][] = [];
    let openedCells = 1;

    targetCell.getNeighbours().forEach((data) => {
        queue.push([data.row, data.column]);
    });

    while (queue.length > 0) {
        const [row, column] = queue.shift()!;
        const cell = cells.value[row][column];
        if (cell.getIsChecked()) continue;
        if (cell.getFlag()) {
            cell.flag = null;
            countBombs.value++;
        }

        const value = cell.getValue();
        cell.openCell();
        openedCells++;

        if (value === null) {
            const neighbours = cell.getNeighbours();
            neighbours.forEach((coords) => {
                const target = cells.value[coords.row][coords.column];
                if (!target.getIsChecked()) {
                    queue.push([coords.row, coords.column]);
                }
            });
        }
    }
    allGoodCells.value = allGoodCells.value - openedCells;
}
