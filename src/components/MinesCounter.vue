<template>
    <div class="container">
        <p class="count">💣 {{ mines }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    mines: {
        type: Number,
        required: true,
    },
});
</script>

<style scoped>
.container {
    box-sizing: border-box;
    height: 30px;
    min-width: 80px;
    padding: 5px 10px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    box-shadow: var(--shadow-inside);
}
.count {
    font-family: var(--font-paragraph);
    font-size: 1.4rem;
    font-weight: 500;
}
</style>
