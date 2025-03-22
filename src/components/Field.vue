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
    // const rows =  ref(0);
    // const columns = ref(0);
    // const emit = defineEmits(['update-field']);
    
    const handleClick = (e: MouseEvent) => {

        const target = e.target as HTMLElement;
        if (target.classList.contains('cell')) {
            const r = parseInt(target.dataset.rowIndex || '0', 10);
            const c = parseInt(target.dataset.columnIndex || '0', 10);

            // const newField = JSON.parse(JSON.stringify(props.field));
            const newField:Cell[][] = props.field.map((row, rowIndex) => {
                return rowIndex === r ? row.map((cell, columnIndex) => {
                    return columnIndex === c ? cell.copy() : cell
                }): row
            });
            const targetCell = newField[r][c]
            targetCell.isChecked = true;

            // emit('update-field', newField);
        }
    };

    // const updateDependencies = () => {
    //     if (props.field && props.field.length > 0) {
    //         rows.value = props.field.length;
    //         columns.value = props.field[0].length;
    //     }
    // };
    // onMounted(() => {
    //     updateDependencies()
    // })

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