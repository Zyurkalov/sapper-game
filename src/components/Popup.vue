<template>
    <div class="backgrounPopup">
        <h3 v-if="popupStore.isWinnerPopup()" class="headerPopup">You win!</h3>
        <form class="popup" @submit="submitForm">
            <button class="popup__closed" @click="popupStore.closePopup">x</button>
            <FormWinner v-if="popupStore.isWinnerPopup()" v-model="nickname"></FormWinner>
            <FormGame v-if="popupStore.isNewGamePopup()"></FormGame>
        </form>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
import FormWinner from './FormWinner.vue'
import Input from './Input.vue'
import FormGame from './FormGame.vue'
import { usePopupStore } from '@/stores/usePopup'
import { useUserData } from '@/stores/useUserData'
import addWinnerInHonorBoard from '@/service/honorBoard/addWinnerInHonorBoard'
import { STORAGE_KEYS, storageKey } from '@/service/types'

const userStore = useUserData()
const popupStore = usePopupStore()
const nickname = ref('')
// const rows = ref(32)
// const columns = ref(16)
// const bombs= ref(100)

    const getNickname = () => {
        return nickname.value ? nickname.value : 'anonymous'
    }
    const submitForm = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        // console.log(getNickname())
        popupStore.closePopup()
        userStore.setUserData({nickname: getNickname()})
        const winner = userStore.getUserData()
        addWinnerInHonorBoard(storageKey[winner.rank] || storageKey.custom, winner)
        // console.log(userStore.getUserData())
    }
    const closePopUp = (e: MouseEvent | KeyboardEvent) => {
        e.stopPropagation()
        if(e.key === 'Escape') {
            popupStore.closePopup()
            const winner = userStore.getUserData()
            userStore.setUserData({nickname: getNickname()})
            // console.log(storageKey[winner.rank])
            addWinnerInHonorBoard(storageKey[winner.rank] || storageKey.custom, winner)
            // console.log(userStore.getUserData())
        }
    } 
    onMounted(() => {
        window.addEventListener('keydown', closePopUp)
    })
    onUnmounted(() => {
        window.removeEventListener('keydown', closePopUp)
    })

</script>

<style scoped>
    .backgrounPopup {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: var(--color-darkgrey);
        z-index: 10;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
    }
    .popup {
        width: 300px;
        margin-bottom: 50px;
        background-color: white;
        position: relative;
        
        padding: 10px;
        border: var(--br-6);
        border-radius: 12px;
        box-shadow: 0 4px 2px var(--color-darkgrey);
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .headerPopup {
        padding-bottom: 10px;
        color: var(--white-soft);
        font-family: var(--font-header);
        font-size: 3rem;
        text-shadow: var(--shadow-outside);
    }
    .popup__closed {
        position: absolute;
        right: 0;
        top: -30px;
        /* border: none; */
        border-radius: 6px;
        background-color: var(--white-soft);
        box-shadow: 0 4px 2px var(--color-darkgrey);
        cursor: pointer;
    }
</style>