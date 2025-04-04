<template>
    <div class="formGame">
        <h3 class="formGame__header">Setting for new game</h3>
        <div class="formGame__container">
            <label for="rows">rows:</label>
            <Input v-model.number="rows" name="rows" placeholder="Rows" />
        </div>
        <div class="formGame__container">
            <label for="columns">columns:</label>
            <Input
                v-model.number="columns"
                name="columns"
                placeholder="Columns"
            />
        </div>
        <div class="formGame__infoCont">
            <span class="formGame__info"
                >max bombs: {{ Math.floor((rows * columns) / 5) }}</span
            >
            <div class="formGame__container">
                <label for="bombs">bombs:</label>
                <Input
                    v-model.number="bombs"
                    name="bombs"
                    placeholder="Bombs"
                    :max="MAX_BOMBS"
                />
            </div>
        </div>
    </div>
    <ButtonSubmit @click="startGame" :disabled="!isInputValid()"
        >Start game</ButtonSubmit
    >
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Input from "./Input.vue";
import ButtonSubmit from "./ButtonSubmit.vue";
import { useRouter } from "vue-router";
import { usePopupStore } from "@/stores/usePopup";
import {
    MAX_BOMBS,
    MAX_ROWANDCOLUMNS,
    MIN_ROWANDCOLUMNS,
} from "@/service/constants";

const rows = ref(16);
const columns = ref(32);
const bombs = ref(100);
const popupStore = usePopupStore();
const router = useRouter();
const maxBombs = computed(() => Math.floor((rows.value * columns.value) / 5));

const isInputValid = () => {
    const isRowsValid =
        rows.value >= MIN_ROWANDCOLUMNS && rows.value <= MAX_ROWANDCOLUMNS;
    const isColumnsValid =
        columns.value >= MIN_ROWANDCOLUMNS &&
        columns.value <= MAX_ROWANDCOLUMNS;
    const isBombsValid = bombs.value > 0 && bombs.value <= maxBombs.value;

    return isRowsValid && isColumnsValid && isBombsValid;
};

const startGame = () => {
    popupStore.closePopup();

    if (isInputValid()) {
        router.push({
            path: `/game/${rows.value}/${columns.value}/${Math.min(
                bombs.value,
                maxBombs.value
            )}`,
        });
    } else {
        console.error("ошибка валидации данных");
    }
};
</script>

<style scoped>
.formGame {
    display: flex;
    padding-bottom: 8px;
    flex-wrap: wrap;
    justify-content: space-between;

    row-gap: 10px;
}

.formGame__header {
    width: 100%;
    padding-right: 10px;
    padding-bottom: 6px;
    font-family: var(--font-paragraph);
    font-weight: 600;
    text-align: center;
}

.formGame__container {
    display: flex;
    align-items: center;
}
.formGame__container > label {
    font-family: var(--font-paragraph);
}

.formGame__infoCont {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
}
.formGame__info {
    font-family: var(--font-paragraph);
    color: var(--color-darkgrey);
    font-size: 0.8rem;
}
</style>
