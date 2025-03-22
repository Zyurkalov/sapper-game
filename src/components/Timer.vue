<template>
    <div class="container"
    :style="getTimerStyle(currenTime).style"
    >
        <span 
            class="timer"
        >
            {{ String(Math.floor(currenTime / 60)).padStart(2, '0') }}
            : {{ String(currenTime % 60).padStart(2, '0') }}
        </span>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { getTimerStyle } from '@/service/timer/getTimerStyle';

const props = defineProps({
    gameTime: {
        type: Number,
        required: true
    },
    isGameContinues: {
        type: Boolean,
        required: true
    }
});
const currenTime = ref(props.gameTime)
const updateTime = () => {
    if(currenTime.value <= 0) return 0
    currenTime.value = currenTime.value - 1
};


onMounted(() => {
    const timer = setInterval(updateTime, 1000)

    onUnmounted(() => {
        clearInterval(timer)
    })
})
</script>

<style scoped>
    .container {
        box-sizing: border-box;
        height: 30px;
        width: 100px;
        padding: 5px 5px;
        margin-bottom: 10px;

        border-radius: 4px;
        background-color: black;

        display: flex;
        align-items: center;
        justify-content: center;
        
        box-shadow: var(--shadow);
        /* border: var(--border); */
    }
    .timer {
        font-family: Tektur, Arial, Helvetica, sans-serif;
        font-size: 1.4rem;
        font-weight: 500;
        /* color: var(--color-grey); */
        color: white;

        
    }
</style>