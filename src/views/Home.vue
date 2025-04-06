<template>
    <div class="mainPage">
        <h1 class="mainPage__header">Sapper-game</h1>
        <Logotype></Logotype>
        <nav class="mainPage__menu">
            <ul>
                <li
                    v-for="game in gameLvl"
                    :key="game.id"
                    class="mainPage__list"
                >
                    <router-link
                        v-if="game.rows"
                        :to="`/game/${game.rows}/${game.columns}/${game.maxBombs}`"
                        class="mainPage__anchor"
                        @click="setUserRank(game.title)"
                    >
                        {{ game.title }}
                    </router-link>
                    <span
                        v-else
                        class="mainPage__anchor"
                        @click="handleCustomGame"
                    >
                        {{ game.title }}
                    </span>
                </li>
            </ul>
        </nav>
        <p class="mainPage__advice">Choose your game</p>
    </div>
</template>

<script setup lang="ts">
import Logotype from "@/components/Logotype.vue";
import { usePopupStore } from "@/stores/usePopup";
import { useUserData } from "@/stores/useUserData";
import { onUnmounted, ref } from "vue";

const popupStore = usePopupStore();
const userStore = useUserData();

const gameLvl = ref([
    { id: 1, title: "easy", rows: 8, columns: 8, maxBombs: 10 },
    { id: 2, title: "medium", rows: 16, columns: 16, maxBombs: 40 },
    { id: 3, title: "hard", rows: 16, columns: 32, maxBombs: 100 },
    { id: 4, title: "custom" },
]);

const setUserRank = (rank: "easy" | "medium" | "hard" | "custom" | any) => {
    userStore.setUserData({ rank });
};
const handleCustomGame = () => {
    setUserRank("custom");
    popupStore.openNewGamePopup();
};
onUnmounted(() => {
    window.removeEventListener("click", handleCustomGame);
});
</script>

<style scoped>
.mainPage {
    width: 100vw;
    height: 80vh;
    padding-bottom: 8vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.mainPage__header {
    padding-top: 50px;
    visibility: hidden;
}
.mainPage__menu > ul {
    list-style: none;
    padding: 0 0 10px 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}
.mainPage__list {
    font-size: 1.4rem;
    color: var(--cell-color-8);
    font-family: var(--font-paragraph);
    text-decoration: unset;
    cursor: pointer;
}
.mainPage__list:hover {
    color: var(--color-grey);
}
.mainPage__anchor {
    text-decoration: none;
    color: unset;
}
.mainPage__advice {
    padding-top: 5px;
    font-family: var(--font-paragraph);
    font-size: 1rem;
    color: var(--color-grey);
}
</style>
