import { usePopupStore } from "@/stores/usePopup";
import { useUserData } from "@/stores/useUserData";
import getScore from "./getScore";
import type { Ref } from "vue";

const gameWin = (
    score: number,
    bombs: number,
    time: number,
    isEndGame: Ref<boolean>
) => {
    const popupStore = usePopupStore();
    const userStore = useUserData();

    popupStore.openWinnerPopup();
    userStore.setUserData({
        score: getScore(score, time, bombs),
        time: time,
    });
    isEndGame.value = true;
    console.log("WINNER!");
};

export default gameWin;
