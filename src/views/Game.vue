<template>
    <div class="template" >
        <!-- <Timer :game-time="65" :is-game-continues="true"></Timer> -->
        <Field v-if="field && field.length > 0" :field="field" @mousedown="handleClick"/>
        <span v-else>Закладываем бомбы...</span>
    </div>
</template>

<script setup lang="ts">
import { startGame, type coordinates } from '@/service/game/startGame';
import { onMounted, onUnmounted, ref, watchEffect } from 'vue';
import Field from '@/components/Field.vue';
import type Cell from '@/classes/cell';
import openEmptyCells from '@/service/game/openEmptyCells';
import createField from '@/service/game/createField';
import { gameOver } from '@/service/game/gameOver';
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
// let bombms: {r: number, c: number}[] = []
const field = ref<Cell[][]>([]);
const score = ref<number>(0)
const bombs = ref<coordinates[]>([])
const allGoodCells = ref(0);
const isNewGame = ref(true);
const isEndGame = ref(false);
const preventContextMenu = (e: MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation()
}

const handleClick = (e: MouseEvent) => {
    try { 
        const target = (e.target as HTMLElement).closest('.cell');
        if (target && !isEndGame.value) {
            const r = parseInt(target.dataset.rowIndex || '0', 10);
            const c = parseInt(target.dataset.columnIndex || '0', 10);

            if (isNewGame.value && e.button === 0) {
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

            if(e.button === 0 && !targetCell.getIsChecked()) {
                targetCell.openCell();
                
                score.value = typeof valueCell === 'number' ? score.value + valueCell : score.value
                if(!valueCell) {
                    console.log('test')
                    const {cells, openedCells} = openEmptyCells(newField, targetCell)
                    allGoodCells.value = allGoodCells.value - openedCells
                    newField = cells
                }
                else if(valueCell === 'bomb') {
                    isEndGame.value = true
                    console.log('GAME OVER')
                    newField = gameOver(valueCell, bombs.value, newField)
                } else {
                    --allGoodCells.value
                }

                field.value = newField;
                
                if(allGoodCells.value === 0) {
                    console.log('WINNER!')
                }
            } else {
                targetCell.changeFlag() 
                field.value = newField;
            }  
        }
    } catch(err) {
        new Error('Ошибка в обработке клика')
    }
}
onMounted(async() => {
    try {
        window.addEventListener('contextmenu', preventContextMenu); 
        field.value = createField(10, 10)
        allGoodCells.value = props.rows * props.columns - props.maxBombs
        console.log(allGoodCells.value)
    }
    catch(err) {
        new Error('Ошибка при создании поля')
        field.value = []
    }
});
onUnmounted(() => {
    window.removeEventListener('contextmenu', preventContextMenu);
    field.value = [];
    score.value = 0;
    bombs.value = [];
    allGoodCells.value = 0;
    isNewGame.value = true;
    isEndGame.value = false;
})
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
