import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePopupStore = defineStore('popup', () => {
    const status= ref(false)
    const typePopup = ref<'newgame' | 'winner' | null>("newgame")

    const openNewGamePopup = () => {
        status.value = true
        typePopup.value = 'newgame'
    }
    const openWinnerPopup = () => {
        status.value = true
        typePopup.value = 'winner'
    }
    const isWinnerPopup = () => {
        return typePopup.value === 'winner' ? true : false
    }
    const isNewGamePopup = () => {
        return typePopup.value === 'newgame' ? true : false
    }
    const closePopup = () => { 
        status.value = false ;
        typePopup.value = null;
    }

    return { status, typePopup, openNewGamePopup, openWinnerPopup, closePopup, isWinnerPopup, isNewGamePopup}
})