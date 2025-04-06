<template>
    <button
        :class="['btnSubmit ', addedClasses]"
        type="submit"
        :disabled="props.disabled"
    >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    addedClasses: {
        type: String,
        default: "",
    },
    disabled: {
        type: Boolean,
        default: true,
    },
});
</script>

<style scoped>
.btnSubmit {
    min-height: 25px;
    margin-bottom: 6px;
    font-family: var(--font-paragraph);
    border-radius: var(--br-6);
    border-bottom: solid 1px lightgray;
    box-shadow: var(--shadow-outside);
}
.btnSubmit:hover {
    cursor: pointer;
}
</style>
