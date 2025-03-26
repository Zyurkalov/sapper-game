<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Popup from "./components/Popup.vue";
import { usePopupStore } from "./stores/usePopup";
const popupStore = usePopupStore();
</script>

<template>
    <header class="wrapper">
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/game">Game</RouterLink>
            <RouterLink to="/honor-board">Score</RouterLink>
        </nav>

        <Transition name="modal">
            <Popup v-if="popupStore.status"></Popup>
        </Transition>
    </header>

    <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
            <component :is="Component" />
        </Transition>
    </RouterView>
</template>

<style scoped>
.wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
}
nav {
    width: 300px;
    font-size: 12px;
    margin-top: 2rem;
    margin-bottom: 0.5rem;

    display: flex;
    justify-content: space-between;

    text-decoration: none;
    color: var(--cell-color-8);
    font-family: var(--font-paragraph);
}
nav a {
    all: unset;
    cursor: pointer;
    font-size: 0.8rem;
    color: var(--cell-color-8);
}
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}
.modal-enter-active .popup-content,
.modal-leave-active .popup-content {
    transition: all 0.3s ease;
}
.modal-enter-from .popup-content {
}
.modal-leave-to .popup-content {
    transform: scale(0.95);
    opacity: 0;
}
.page-enter-active,
.page-leave-active {
    transition: all 0.5s ease-out;
}
.page-enter-from {
    opacity: 0;
    transform: translateY(20px);
}
.page-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}
</style>
