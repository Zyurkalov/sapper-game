<template>
    <div class="mainPage">
        <h1 class="mainPage__header">Sapper-game</h1>
        <Logotype></Logotype>
        <nav class="mainPage__menu">
            <ul>
                <li v-for="game in gameLvl " :key="game.id" class="mainPage__list">
                    <router-link 
                        :to="`game/${game.rows}/${game.columns}/${game.maxBombs}`"
                        class="mainPage__anchor"
                        >
                        {{ game.title }}
                    </router-link>
                </li>
            </ul>
        </nav>
        <p class="mainPage__advice">choise your game</p>
    </div>
</template>

<script setup lang="ts">
import Logotype from '@/components/Logotype.vue';
import { ref } from 'vue';

    const gameLvl = ref([
        { id: 1, title: 'easy', rows: 8, columns: 8, maxBombs: 10},
        { id: 2, title: 'medium', rows: 16, columns: 16, maxBombs: 40},
        { id: 3, title: 'hard', rows: 16, columns: 32, maxBombs: 100},
        { id: 4, title: 'custom', rows: 16, columns: 16, maxBombs: 40},
    ])
</script>

<style scoped>
    .mainPage {
        width: 100vw;
        height: 85vh;

        display: flex;
        flex-direction: column;
        align-items: center;
        /* justify-content: center; */

    }
    .wrapper {
        position: relative;
        height: 200px;
        padding-top: 60px;
        background-image: url('/icons/Star-big.svg');
        background-repeat: no-repeat;
        background-position: center;
        /* background-position-y: -55px; */
        display: flex;
        flex-direction: column;
        align-items: center;

        gap: -0px;
    }
    .mainPage__header {
        padding-top: 50px;
        visibility: hidden;
    }
    .wrapper__paragraph {
        position: absolute;
        top: 150px;
        font-family: var(--font-paragraph);
        font-size: 1rem;
        font-weight: 400;
    }
    .mainPage__menu > ul {
        list-style: none;
        padding: 0;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px
    }
    .mainPage__anchor {
    }
    .mainPage__list {
        min-height: 70px;
        min-width: 70px;
        border: solid 1px grey;
    }
    .mainPage__advice {
        padding-top: 5px;
        font-family: var(--font-paragraph);
        font-size: 1rem;
        color: var(--color-grey);
    }
</style>