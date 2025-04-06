<template>
    <div class="field">
        <ul v-for="(row, rowIndex) in props.field" :key="`${rowIndex}`">
            <li
                class="cell"
                v-for="(cell, columnIndex) in row"
                :key="`${rowIndex}-${columnIndex}`"
                :data-row-index="rowIndex"
                :data-column-index="columnIndex"
                :class="getCellStyle(cell).class"
                :style="getCellStyle(cell).style"
            >
                <span class="cellValue" :key="uuidv4()">
                    {{ cell.isChecked ? getCellValue(cell.value) : null }}
                    {{ paintFlag(cell, cell.isChecked) }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { type PropType } from "vue";
import { v4 as uuidv4 } from "uuid";
import type Cell from "@/classes/cell";
import { getCellStyle } from "@/service/field/getCellStyle";
import { getCellValue } from "@/service/field/getCellValue";

const props = defineProps({
    field: {
        type: Array as PropType<Cell[][]>,
        required: true,
    },
});
const paintFlag = (target: Cell, isOpened: boolean) => {
    if (isOpened) return;
    const value = target.getFlag();
    return value === "flag" ? "🚩" : value !== null ? "❓" : "";
};
</script>

<style scoped>
.field {
    max-width: 80vw;
    max-height: 75vh;
    overflow: auto;
    width: fit-content;
}
ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: nowrap;
}
.cell {
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    min-width: 20px;
    min-height: 20px;
    flex: 1 0 auto;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    border: 1px solid grey;
    border-radius: 5px;
}
.cell__bomb {
    color: white;
}
.cell__closed {
    background-color: var(--cell-color-0);
}
.cell__closed:hover {
    cursor: pointer;
    box-shadow: 0 4px 2px var(--cell-color-1);
}
.cellValue {
    min-height: 11px;
    font-weight: 700;
    font-family: var(--font-paragraph);
}
</style>
