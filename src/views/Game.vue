<template>
    <div class="template">
        <Field v-if="field && field.length > 0" :field="field" />
        <span v-else>Закладываем бомбы...</span>
        <!-- <p>{{ field.length > 0 ? field[0][0].value : null}}</p> -->
    </div>
</template>

<script setup>
import { startGame } from '@/service/game/startGame';
import { onMounted, ref, watchEffect } from 'vue';
import Field from '@/components/Field.vue';

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

const field = ref([]);

// watchEffect(() => {
//     console.log('field изменился', field.value);
// });

onMounted(async() => {
    try {
        field.value = startGame(10, 10, 20);
        // field.value = new Array(1,2,3)
        console.log(field.value)
    }
    catch(err) {
        console.log(err)
        field.value = []
    }
});
</script>

<style scoped>
    .template {
        width: 100vw;
        height: 90vh;

        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
