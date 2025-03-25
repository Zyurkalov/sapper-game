<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import PopUp from './components/PopUp.vue';
import { usePopupStore } from './stores/usePopup';
const popupStore = usePopupStore()
</script>

<template>
  <header class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/game">Game</RouterLink>
        <RouterLink to="/honor-board">Score</RouterLink>

      </nav>
      <PopUp v-if="popupStore.status"></PopUp>
  </header>

  <RouterView />
</template>

<style scoped>

.wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  
}


nav {
  width: 320px;
  font-size: 12px;
  margin-top: 2rem;

  display: flex;
  justify-content: space-between;
}


</style>
