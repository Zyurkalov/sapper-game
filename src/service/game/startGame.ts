import type Cell from "@/classes/cell";
import { createBombs } from "./createBombs";
import createField from "./createField";
import type { Ref } from "vue";

export type coordinates = { r: number; c: number };

export const startGame = (
    row: number,
    column: number,
    bombs: number,
    field: Ref<Cell[][]>,
    startCords?: { row: number; col: number }
) => {
    row = row < 5 ? 5 : row;
    column = column < 5 ? 5 : column;
    const maxBombs = Math.floor((row * column) / 5);
    bombs = Math.min(bombs, maxBombs);
    const cords = startCords ? startCords : { row: 0, col: 0 };

    const initialField = field.value || createField(row, column);
    const coordBombs: coordinates[] = createBombs(
        row,
        column,
        bombs,
        cords || { row: 0, col: 0 }
    );
    const coordNumbers: coordinates[] = [];

    coordBombs.forEach(({ r, c }) => {
        const cell = initialField[r][c];
        cell.createBomb();
        cell.flag = null;

        const neighbours = cell.getNeighbours().map(({ row, column }) => ({
            r: row,
            c: column,
        }));
        coordNumbers.push(...neighbours);
    });

    coordNumbers.forEach(({ r, c }) => {
        const cell = initialField[r][c];
        cell.createNumber();
        cell.flag = null;
    });
    return { initialField, coordBombs };
};
