<template>
    <div class="template">
        <div class="arcade">
            <div class="arcade__wire arcade__wire_left"></div>
            <div class="arcade__wire arcade__wire_right"></div>
            <div class="arcade__switch arcade__switch_right"></div>
            <div class="arcade__switch arcade__switch_left"></div>

            <div class="arcade__header">
                <MinesCounter :mines="countBombs"></MinesCounter>
                <button class="arcade__btn" @click="restartGame">
                    RESTART
                </button>
                <Timer :game-time="timer"></Timer>
            </div>
            <Field
                v-if="field && field.length > 0"
                :field="field"
                @mousedown="handleClick"
            />
            <span v-else>launch the bomb...</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { startGame, type coordinates } from "@/service/game/startGame";
import { onMounted, onUnmounted, ref, type Ref } from "vue";
import Field from "@/components/Field.vue";
import type Cell from "@/classes/cell";
import openEmptyCells from "@/service/game/openEmptyCells";
import createField from "@/service/game/createField";
import gameOver from "@/service/game/gameOver";
import Timer from "@/components/Timer.vue";
import MinesCounter from "@/components/MinesCounter.vue";
import updateTime from "@/service/game/updateTime";
import getAllGoodCell from "@/service/game/checkAllGoodCell";
import getTime from "@/service/game/getTime";
import gameWin from "@/service/game/gameWin";
import openCell from "@/service/game/openCell";
import { computed } from "vue";
import clearSetInterval from "@/service/game/clearSetInterval";

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

const field: Ref<Cell[][]> = ref([]);
const score = ref<number>(0);
const bombs = ref<coordinates[]>([]);
const allGoodCells = ref(0);
const isEndGame = ref(false);
const timer = ref<number>(0);
const _countBombs = ref<number>(props.maxBombs);
const countBombs = computed({
    get: () => _countBombs.value,
    set: (newValue) => {
        _countBombs.value = Math.min(newValue, props.maxBombs);
    },
});
const preventContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
};
let startTimer: null | number = null;
const handleClick = (e: MouseEvent) => {
    try {
        const target = (e.target as HTMLElement).closest(".cell");
        if (target && !isEndGame.value) {
            const r = parseInt(
                (target as HTMLElement).dataset.rowIndex || "0",
                10
            );
            const c = parseInt(
                (target as HTMLElement).dataset.columnIndex || "0",
                10
            );
            if (
                allGoodCells.value === getAllGoodCell(props) &&
                e.button === 0
            ) {
                const { initialField, coordBombs } = startGame(
                    props.rows,
                    props.columns,
                    props.maxBombs,
                    field,
                    { row: r, col: c }
                );
                field.value = initialField;
                countBombs.value = coordBombs.length;
                bombs.value = coordBombs;
                timer.value = getTime(props.rows, props.columns);

                if (!startTimer) {
                    startTimer = setInterval(() => {
                        timer.value = updateTime(timer.value, true);
                    }, 1000);
                }
            }

            const targetCell: Cell = field.value[r][c];
            const valueCell = targetCell.getValue();

            if (e.button === 0 && !targetCell.getIsChecked()) {
                openCell(targetCell, countBombs);

                if (typeof valueCell === "number") {
                    score.value += valueCell;
                    --allGoodCells.value;
                }
                if (!valueCell) {
                    openEmptyCells(field, targetCell, allGoodCells, countBombs);
                }
                if (valueCell === "bomb" || timer.value <= 0) {
                    gameOver(valueCell, bombs.value, field, isEndGame);
                    startTimer = clearSetInterval(startTimer);
                }

                if (allGoodCells.value === 0) {
                    gameWin(
                        score.value,
                        props.rows,
                        props.columns,
                        timer.value,
                        bombs.value.length,
                        isEndGame
                    );
                    startTimer = clearSetInterval(startTimer);
                }
            } else {
                targetCell.changeFlag();

                if (!targetCell.getIsChecked()) {
                    const flag = targetCell.getFlag();
                    countBombs.value =
                        flag === "flag"
                            ? countBombs.value - 1
                            : flag === null
                            ? countBombs.value + 1
                            : countBombs.value;
                }
            }
        }
    } catch (err) {
        throw new Error(`Ошибка в обработке клика: ${err}`);
    }
};
const restartGame = () => {
    score.value = 0;
    bombs.value = [];
    countBombs.value = props.maxBombs;
    allGoodCells.value = getAllGoodCell(props);
    isEndGame.value = false;
    timer.value = getTime(props.rows, props.columns);
    field.value = createField(props.rows, props.columns);
    startTimer = clearSetInterval(startTimer);
};
onMounted(() => {
    window.addEventListener("contextmenu", preventContextMenu);
    field.value = createField(props.rows, props.columns);
    allGoodCells.value = getAllGoodCell(props);
});
onUnmounted(() => {
    window.removeEventListener("contextmenu", preventContextMenu);
    window.removeEventListener("click", handleClick);
    window.removeEventListener("click", restartGame);
    startTimer = clearSetInterval(startTimer);
});
</script>

<style scoped>
.template {
    width: 100vw;
    height: 85vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.gameInt {
    padding-bottom: var(--pd-10);
}
.arcade {
    padding: var(--pd-10);
    border: var(--border);
    border-radius: var(--br-12);
    box-shadow: var(--shadow-outside);

    position: relative;
    z-index: 1;
}
.arcade__header {
    display: flex;
    padding-bottom: var(--pd-10);
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
.arcade__wire {
    position: absolute;
}
.arcade__wire_left {
    top: -53px;
    left: -41px;
    z-index: -1;

    height: 170px;
    width: 125px;
    background-image: url(../assets/images/Group1.svg);
    background-repeat: no-repeat;
}
.arcade__wire_right {
    bottom: 20px;
    right: -51px;
    z-index: -1;

    height: 182px;
    width: 51px;
    background-image: url(../assets/images/Group2.svg);
    background-repeat: no-repeat;
}
.arcade__switch {
    position: absolute;
}
.arcade__switch_right {
    z-index: -1;
    top: -23px;
    right: 20px;

    height: 21px;
    width: 60px;
    background-image: url(../assets/images/Group3.svg);
    background-repeat: no-repeat;
}
.arcade__switch_left {
    z-index: -1;
    top: -10px;
    right: 90px;

    height: 10px;
    width: 30px;
    background-color: var(--color-grey);
}
</style>
