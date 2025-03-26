import { ref } from "vue";
import { defineStore } from "pinia";

type userData = {
    score?: number;
    time?: number;
    nickname?: string;
    rank?: "easy" | "medium" | "hard" | "custom" | "";
};
export const useUserData = defineStore("winner", () => {
    const score = ref(0);
    const time = ref(0);
    const nickname = ref("anonymous");
    const rank = ref("custom");

    const useClear = () => {
        score.value = 0;
        time.value = 0;
        nickname.value = "anonymous";
        rank.value = "custom";
    };
    const setUserData = (data: userData) => {
        if (data.score !== undefined) {
            score.value = data.score;
        }
        if (data.time !== undefined) {
            time.value = data.time;
        }
        if (data.nickname !== undefined) {
            nickname.value = data.nickname;
        }
        if (data.rank) {
            rank.value = data.rank;
        }
    };
    const getUserData = () => {
        return {
            score: score.value,
            time: time.value,
            nickname: nickname.value,
            rank: rank.value,
        };
    };

    return { score, useClear, setUserData, getUserData };
});
