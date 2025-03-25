<template>
    <input class="inputComponent" 
        type="number"
        :name="name"
        :id="name"
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleInput"
        :min="props.min"
        :max="props.max"
        required
    >
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    default: 'input'
  },
  placeholder: {
    type: String,
    default: ''
  },
  min: {
    type: Number,
    default: 8
  },
  max: {
    type: Number,
    default: 100
  },
})
const emit = defineEmits()

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  const value = target.valueAsNumber || Number(target.value) || props.min
  emit('update:modelValue', Math.max(props.min, Math.min(props.max, value)))
}

</script>

<style coped>
    .inputComponent {
        width: 70px;
        height: 30px;
        padding: 2px 5px 0;

        font-family: var(--font-paragraph);
        border-radius: var(--br-6);
        border-bottom: solid 1px lightgray;
        box-shadow: var(--shadow-inside);
    }
</style>