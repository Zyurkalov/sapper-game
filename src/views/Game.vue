<template>
    <div class="template" >
        <div class="arcade" >
            <div class="arcade__header" >
                <MinesCounter :mines="countBombs" ></MinesCounter>
                <button class="arcade__btn" @click="restartGame">RESTART</button>
                <Timer :game-time="timer"></Timer>
            </div>
            <Field v-if="field && field.length > 0" :field="field" @mousedown="handleClick"/>
            <span v-else>Закладываем бомбы...</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { startGame, type coordinates } from '@/service/game/startGame';
import { onMounted, onUnmounted, ref, watchEffect } from 'vue';
import Field from '@/components/Field.vue';
import type Cell from '@/classes/cell';
import openEmptyCells from '@/service/game/openEmptyCells';
import createField from '@/service/game/createField';
import gameOver from '@/service/game/gameOver';
import Timer from '@/components/Timer.vue';
import MinesCounter from '@/components/MinesCounter.vue';
import updateTime from '@/service/game/updateTime';
import getAllGoodCell from '@/service/game/checkAllGoodCell';
import getTime from '@/service/game/getTime';
import getScore from '@/service/game/getScore';

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
const countBombs = ref<number>(props.maxBombs)
const allGoodCells = ref(0);
// const isNewGame = ref(true);
const isEndGame = ref(false);
const timer = ref<number>(0)
const preventContextMenu = (e: MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation()
}
let startTimer:null | number = null;

const handleClick = (e: MouseEvent) => {
    try { 
        const target = (e.target as HTMLElement).closest('.cell');
        if (target && !isEndGame.value ) {
            const r = parseInt(target.dataset.rowIndex || '0', 10);
            const c = parseInt(target.dataset.columnIndex || '0', 10);
            
            if (allGoodCells.value === getAllGoodCell(props) && e.button === 0) {
                const { initialField, coordBombs } = startGame(props.rows, props.columns, props.maxBombs, field.value, { row: r, col: c });
                field.value = initialField;
                // isNewGame.value = false;
                bombs.value = coordBombs
                timer.value = getTime(props.rows, props.columns)
                
                if(!startTimer){
                    startTimer = setInterval(() => {
                        timer.value = updateTime(timer.value, true);
                    }, 1000);
                }
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
                if (typeof valueCell === 'number') {
                    score.value += valueCell;
                    --allGoodCells.value
                }
                if(!valueCell) {
                    const {cells, openedCells} = openEmptyCells(newField, targetCell)
                    allGoodCells.value = allGoodCells.value - openedCells
                    newField = cells
                }
                if (valueCell === 'bomb' || timer.value <= 0) {
                    isEndGame.value = true
                    console.log('GAME OVER')
                    newField = gameOver(valueCell, bombs.value, newField)
                    if(startTimer){
                        clearInterval(startTimer)
                        startTimer = null
                    }
                }
                field.value = newField;
                
                if(allGoodCells.value === 0) {
                    isEndGame.value = true
                    if(startTimer){
                        clearInterval(startTimer)
                        startTimer = null
                    }
                    console.log(getScore(score.value, getTime(props.rows, props.columns), timer.value))
                    console.log('WINNER!')
                }
            } else {
                targetCell.changeFlag() 
                field.value = newField;

                if(!targetCell.getIsChecked()) {
                    const flag = targetCell.getFlag()
                    countBombs.value = flag === 'flag' 
                        ? countBombs.value -1 
                        : flag === null
                            ? countBombs.value +1
                            : countBombs.value
                }
            }  
            // console.log(allGoodCells.value)
        }
    } catch(err) {
        throw new Error('Ошибка в обработке клика')
    }
}
const restartGame = () => {
    field.value = [];
    score.value = 0;
    bombs.value = [];
    countBombs.value = props.maxBombs
    allGoodCells.value = getAllGoodCell(props)
    // isNewGame.value = true;
    isEndGame.value = false;
    timer.value = getTime(props.rows, props.columns)
    field.value = createField(props.rows, props.columns)
}
onMounted(() => {
    window.addEventListener('contextmenu', preventContextMenu); 
    field.value = createField(props.rows, props.columns)
    allGoodCells.value = getAllGoodCell(props)

});
onUnmounted(() => {
    window.removeEventListener('contextmenu', preventContextMenu);
    if(startTimer) {
        clearInterval(startTimer)
        startTimer = null;
    }; 
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
    .arcade{
        padding: 10px;
        border: var(--border);
        border-radius: 12px;
        box-shadow: var(--shadow-outside);
    }
    .arcade__header {
        display: flex;
        padding-bottom: 10px;
        justify-content: space-between;
    }
    .arcade__btn {
        font-family: var(--font-paragraph);
        border: 0;
        background-color: transparent;
    }
    .arcade__btn:hover {
        cursor: pointer;
    }
</style>
