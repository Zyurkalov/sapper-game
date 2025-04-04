import type Cell from "@/classes/cell";
import type { coordinates } from "./startGame";
import type { Ref } from "vue";

const gameOver = (
    value: number | "bomb" | null,
    bombs: coordinates[],
    field: Ref<Cell[][]>,
    isEndGame: Ref<boolean>
) => {
    if (value === "bomb") {
        bombs.forEach(({ r, c }) => {
            field.value[r][c].isChecked = true;
        });
    }
    isEndGame.value = true;
    console.log("GAME OVER");
    // return field;
};
export default gameOver;
