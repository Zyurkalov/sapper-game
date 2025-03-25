<template>
    <div class="honor">
        <Logotype></Logotype>
        <menu class="honor__menu" @click="changeRank">
            <button class="honor__btn" >easy</button>
            <button class="honor__btn">medium</button>
            <button class="honor__btn">hard</button>
            <button class="honor__btn">custom</button>
        </menu>
        <Transition name="fade-slide" mode="out-in">
            <ul v-if="winners.length" class="honor__listWinners" :key="currentRank">
                <li v-for="player in winners" :key="player.id" class="honor__list">
                    <div class="honor__player">
                        <span class="honor__span honor__span_place">{{ player.place }}</span>
                        <p class="honor__namePlayer">{{ player.name }}</p>
                        <span class="honor__span honor__span_score">{{ player.score }}</span>
                    </div>
                </li>
            </ul>
        </Transition>

    </div>
</template>

<script setup lang="ts">
import Logotype from '@/components/Logotype.vue';
import { DEFAULT_WINNERS } from '@/service/constants';
import { getDefaultLeaders } from '@/service/honorBoard/getDefaultLeaders';
import { getLocalStorage } from '@/service/honorBoard/getLocalStorage';
import { getStorageKey } from '@/service/honorBoard/getStorageKey';
import { setLocalStorage } from '@/service/honorBoard/setLocalStorage';

import { STORAGE_KEYS, type TRank, type TWinner } from '@/service/types';
import { onMounted, ref } from 'vue';

const currentRank = ref('easy');
const winners = ref<TWinner[]>([])

const changeRank = (e: MouseEvent): void => {
    e.stopPropagation()
    const target = e.target as HTMLElement | null;
    if (target?.textContent) {
        currentRank.value = target.textContent.trim().toLowerCase();
        const storageDate: TWinner[] | null = getLocalStorage(getStorageKey(currentRank.value))
        if(storageDate) {
            winners.value = storageDate
        } else {
            const newWinners: TWinner[] = getDefaultLeaders()
            winners.value = newWinners
            setLocalStorage(newWinners, getStorageKey(currentRank.value))
        }
    } 
}
    onMounted(() => {
        const storedData = getLocalStorage(STORAGE_KEYS.winnersEasy);
        if (!storedData) {
            setLocalStorage(DEFAULT_WINNERS, STORAGE_KEYS.winnersEasy)
            winners.value = DEFAULT_WINNERS
        }
        else {
            winners.value = storedData
        }
    })
</script>

<style scoped>
    .honor {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .honor__menu {
        width: 100%;
        max-width: 400px;
        padding-left: 10px;
        display: flex;
        gap: 2px;
    }
    .honor__btn {
        padding-top: 2px;
        min-width: 50px;
        border-style: none;
        border-radius: 5px 5px 0 0;
        background-color: var(--color-grey);
        cursor: pointer;
        color: white;
        font-size: 14px;
        font-family: var(--font-paragraph);
    }
    .honor__listWinners {
        padding: 0;
        list-style: none;
        width: 100%;
        max-width: 400px;

        padding: 10px;
        border: var(--border);
        border-radius: 12px;
        box-shadow: var(--shadow-outside);
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .honor__list {
        overflow: hidden;
        border-radius: var(--br-6);
        border-bottom: solid 1px lightgray;
        box-shadow: var(--shadow-inside);
    }
    .honor__player {
        display: flex;
        min-height: 25px;

        align-items: center;
        justify-content: space-between;
        gap: 10px;
    }
    .honor__span {
        padding: 0 8px;
        min-height: 25px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        background-color: var(--cell-color-8);

        font-family: var(--font-header);
        font-size: 1.2rem;
        color: white;
    }
    .honor__span_place {
        width: 35px;
        justify-content: start;

    }
    .honor__span_score {
        width: 80px;
        justify-content: end;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .honor__namePlayer{
        flex: 1;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: var(--font-paragraph);
        font-size: 1rem;
        font-weight: 600;
    }
    .fade-slide-enter-active,
    .fade-slide-leave-active {
        transition: all 0.5s ease-out
    }

    .fade-slide-enter-from {
        opacity: 0;
        transform: translateY(20px);
    }

    .fade-slide-leave-to {
        opacity: 0;
        transform: translateY(-20px);
    }
    
</style>