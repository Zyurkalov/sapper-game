<template>
    <div class="template" >
        <!-- <Timer :game-time="65" :is-game-continues="true"></Timer> -->
        <Field v-if="field && field.length > 0" :field="field" @click="handleClick"/>
        <span v-else>Закладываем бомбы...</span>
    </div>
</template>

<script setup lang="ts">
import { startGame, type coordinates } from '@/service/game/startGame';
import { onMounted, ref, watchEffect } from 'vue';
import Field from '@/components/Field.vue';
import type Cell from '@/classes/cell';
import openEmptyCells from '@/service/game/openEmptyCells';
import createField from '@/service/game/createField';
// import Timer from '@/components/Timer.vue';

const props = defineProps({
    rows: {
        type: Number,
        required: true,
    },
    columns: {
        type: Number,
        required: true,
    },
    maxBombs: {
        type: Number,
        required: true,
    },
});
let bombms: {r: number, c: number}[] = []
const field = ref<Cell[][]>([]);
const score = ref<number>(0)
const isNewGame = ref(true);
const bombs = ref<coordinates[]>([])

const handleClick = (e: MouseEvent) => {
    try { 
        e.stopPropagation()
        const target = e.target as HTMLElement;
        if (target.classList.contains('cell')) {
            const r = parseInt(target.dataset.rowIndex || '0', 10);
            const c = parseInt(target.dataset.columnIndex || '0', 10);

            if (isNewGame.value) {
                const { initialField, coordBombs } = startGame(10, 10, 20, field.value, { row: r, col: c });
                field.value = initialField;
                isNewGame.value = false;
                bombs.value = coordBombs
            }

            // const newField = JSON.parse(JSON.stringify(props.field));
            let newField:Cell[][] = field.value.map((row, rowIndex) => {
                return rowIndex === r ? row.map((cell, columnIndex) => {
                    return columnIndex === c ? cell.copy() : cell
                }): row
            });

            const targetCell = newField[r][c]
            const valueCell = targetCell.getValue()
            targetCell.openCell();
            
            score.value = typeof valueCell === 'number' ? score.value + valueCell : score.value
            // console.log(score.value)
            if(!valueCell) {newField = openEmptyCells(newField, targetCell)}
            console.log(bombs.value)

            field.value = newField;
        }
    } catch(err) {
        new Error('Ошибка в обработке клика')
    }
}
onMounted(async() => {
    try {
        // const {initialField, coordBombs} = startGame(10, 10, 20);
        // field.value = initialField
        // bombms = coordBombs
        field.value = createField(10, 10)
    }
    catch(err) {
        new Error('Ошибка при создании поля')
        field.value = []
    }
});
</script>

<style scoped>
    .template {
        width: 100vw;
        height: 90vh;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .gameInt {
        padding-bottom: 10px;
    }
</style>
