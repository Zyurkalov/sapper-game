<template>
    <div>
        <button @click='handleClick'></button>
    </div>
</template>

<script setup>
import { startGame } from '@/service/game/startGame';
import { onMounted, ref } from 'vue';

    const props = defineProps({
        rows: {
            type: Number,
            required: true,
        },
        columns: {
            type: Number,
            required: true,
        },
        maxBombs: {
            type: Number,
            required: true,
        },
    });

    const field = ref([])

    const handleClick = () => {
        console.log(field.value)
    }

    onMounted(() => {
        field.value = startGame(props.rows = 4, props.columns = 4, props.maxBombs = 4)
    })
</script>

<style scoped>

</style>