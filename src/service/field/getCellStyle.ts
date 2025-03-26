import type Cell from "@/classes/cell";

export const getCellStyle = (cell: Cell) => {
    if( !cell.isChecked) {
        return {
            class: 'cell__closed'
        }
    }
    if(typeof cell.value === 'number') {
        return {
            class: 'cell__number',
            style: {
                color: `var(--cell-color-${cell.value})`,
                borderColor: `var(--cell-color-${cell.value})`
            }
        }
    }
    return {
        class: cell.value === 'bomb' ? 'cell__bomb' : 'cell__null',
        style: {
            backgroundColor: cell.value === 'bomb' ? `var(--cell-color-7)` : 'transparent',
            borderColor: cell.value === 'bomb' ? `var(--cell-color-7)` : 'transparent'
        }
    }
};