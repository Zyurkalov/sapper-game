<template>
    <div class="formWinner">
        <div class="formWinner__result">
            <p>Score:</p>
            <span>{{ userScore }}</span>
        </div>
        <div class="formWinner__result">
            <p>Time:</p>
            <span>{{ getTime() }}</span>
        </div>
    </div>
    <input
        class="formWinner__input"
        type="text"
        name="name"
        id="nickname"
        placeholder="nickname"
        :minlength="MIN_LENGTH"
        :maxlength="MAX_LENGTH"
        :value="modelValue"
        @input="handleInput"
        required
    />
    <ButtonSubmit :disabled="!isInputValid()">Сonfirm</ButtonSubmit>
</template>

<script setup lang="ts">
import { useUserData } from "@/stores/useUserData";
import ButtonSubmit from "./ButtonSubmit.vue";
import { computed } from "vue";

const props = defineProps({
    modelValue: {
        type: String,
        default: "anonymous",
    },
});
const emit = defineEmits();
const userStore = useUserData();
const MIN_LENGTH = 3;
const MAX_LENGTH = 20;

const isInputValid = () => {
    return (
        props.modelValue.length >= MIN_LENGTH &&
        props.modelValue.length <= MAX_LENGTH
    );
};
const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    emit("update:modelValue", target.value);
};
const getTime = () => {
    const time = userStore.getUserData().time;
    const min = String(Math.floor(time / 60)).padStart(2, "0");
    const sec = String(Math.floor(time % 60)).padStart(2, "0");
    return `${min}:${sec}`;
};
const userScore = computed(() => userStore.getUserData().score);
</script>

<style scoped>
.formWinner {
    display: flex;
    justify-content: space-between;
}
.formWinner__result {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}
.formWinner__result > p {
    font-family: var(--font-paragraph);
    font-weight: 600;
}
.formWinner__result > span {
    font-family: var(--font-paragraph);
}
.formWinner__input {
    min-height: 30px;
    padding-left: 6px;
    border-radius: var(--br-6);
    border-bottom: solid 1px lightgray;
    box-shadow: var(--shadow-inside);
}
</style>
