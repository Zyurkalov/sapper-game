import { usePopupStore } from "@/stores/usePopup";
import { useUserData } from "@/stores/useUserData";
import getScore from "./getScore";
import type { Ref } from "vue";
import getTime from "./getTime";

const gameWin = (
    score: number,
    rows: number,
    columns: number,
    time: number,
    bombs: number,
    isEndGame: Ref<boolean>
) => {
    const popupStore = usePopupStore();
    const userStore = useUserData();
    const gameTime = getTime(rows, columns) - time;

    popupStore.openWinnerPopup();
    userStore.setUserData({
        score: getScore(score, rows * columns, gameTime, bombs),
        time: time,
    });
    isEndGame.value = true;
    console.log("WINNER!");
};

export default gameWin;
