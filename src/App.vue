<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/game">Game</RouterLink>
        <RouterLink to="/honor-board">Score</RouterLink>

      </nav>
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
