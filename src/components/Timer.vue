<template>
    <div class="container" :style="getTimerStyle(currenTime).style">
        <span class="timer">
            {{ String(Math.floor(currenTime / 60)).padStart(2, "0") }}
            : {{ String(Math.floor(currenTime % 60)).padStart(2, "0") }}
        </span>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { getTimerStyle } from "@/service/timer/getTimerStyle";

const props = defineProps({
    gameTime: {
        type: Number,
        required: true,
    },
});
const currenTime = ref(props.gameTime);
watch(
    () => props.gameTime,
    (newTime) => {
        currenTime.value = newTime;
    },
    { immediate: true }
);
</script>

<style scoped>
.container {
    box-sizing: border-box;
    height: 30px;
    /* width: 100px; */
    padding: 5px 5px;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-inside);
}
.timer {
    font-family: Tektur, Arial, Helvetica, sans-serif;
    font-size: 1.4rem;
    font-weight: 500;
}
</style>
