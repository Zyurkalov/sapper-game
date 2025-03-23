<template>
    <div class="field" >
        
            <ul v-for="(row, rowIndex) in props.field" :key="`${rowIndex}`">
                <li class="cell" 
                    v-for="(cell, columnIndex) in row" 
                    :key="`${rowIndex}-${columnIndex}`"
                    :data-row-index="rowIndex"
                    :data-column-index="columnIndex"
                    :class="getCellStyle(cell).class"
                    :style="getCellStyle(cell).style"
                    >
                    <span class="cellValue":key="uuidv4()">
                        {{ cell.isChecked ? getCellValue(cell.value) : null}}
                        <!-- {{ cell.getFlag() && !cell.isChecked ? cell.getFlag() : null}} -->
                        {{ paintFlag(cell, cell.isChecked) }}
                    </span>
                </li>
            </ul>
        </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type PropType } from 'vue';
import {v4 as uuidv4} from 'uuid'
import type Cell from '@/classes/cell';
import { getCellStyle } from '@/service/field/getCellStyle';
import { getCellValue } from '@/service/field/getCellValue';

    const props = defineProps({
        field: {
        type: Array as PropType<Cell[][]>,
        required: true,
    },
    })
    const paintFlag = (target: Cell, isOpened: boolean) => {
        if(isOpened) return
        const value = target.getFlag()
        return value === 'flag' ? 'f' : value !== null ? '?' : ''
    }
</script>   

<style scoped>
    ul {
        padding: 0;
        list-style: none;
    }
    .field {
        padding: 10px;
        border: var(--border);
        border-radius: 12px;
        box-shadow: var(--shadow);

    }
    .cell {
        box-sizing: border-box;
        min-width: 30px;
        min-height: 30px;

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
        box-Shadow: 0 4px 2px var(--cell-color-1);
    }
    .cellValue {
        min-height: 12px;
        font-weight: 700;
    }
</style>