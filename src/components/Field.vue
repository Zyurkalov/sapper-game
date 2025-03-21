<template>
    <div class="field" @click='handleClick'>
            <div v-for="(row, rowIndex) in props.field" :key="uuidv4()">
                <div class="cell" v-for="(cell, columnIndex) in row" 
                    :key="uuidv4()"
                    :data-row-index="rowIndex"
                    :data-column-index="columnIndex"
                    >
                    <span class="cellNumber":key="uuidv4()">
                        {{ cell.isChecked ? getCellValue(cell.value) : null}}
                    </span>
                </div>
            </div>
        </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from 'vue';
import {v4 as uuidv4} from 'uuid'

    const props = defineProps({
        field: {
        type: Array,
        required: true,
    },
    })
    const rows =  ref(0);
    const columns = ref(0);
    
    const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.className === 'cell') {
            // console.log(target.dataset.rowIndex)
            const r = parseInt(target.dataset.rowIndex || '0', 10);
            const c = parseInt(target.dataset.columnIndex || '0', 10);

            // console.log(r, c)
            props.field[r][c].isChecked = true;

        }
        //console.log(e.target);
    };
    const getCellValue = (cellValue: number | null | 'bomb') => {
        return typeof cellValue === 'number' ? cellValue : cellValue === 'bomb' ? 'B' : ''
    } 
    const updateDependencies = () => {
        if (props.field && props.field.length > 0) {
            rows.value = props.field.length;
            columns.value = props.field[0].length;
        }
    };

    // watch(() => props.field,
    //     (newField) => {
    //         if(newField && newField.length > 0){
    //             rows.value = newField.length;
    //             columns.value = newField[0].length
    //         } 
    //     }
    // );
    onMounted(() => {
        updateDependencies()
        console.log(props.field[0][0].value)


    })

</script>

<style scoped>

.field {

        padding: 10px;
        border: 2px solid grey;
        border-radius: 12px;
        box-shadow: 0 5px 5px rgb(45, 44, 54);
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
    .cellNumber {
        min-height: 12px;
        font-weight: 700;
    }
    
    .cellBomb {}
</style>