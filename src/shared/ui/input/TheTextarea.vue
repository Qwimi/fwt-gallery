<script lang="ts" setup>
defineProps<{
  label: string
  name: string
  placeholder?: string
  error?: string
  theme?: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form__element" :class="[{ error: error }, `form__element--${theme}`]">
    <label class="form__element__label">{{ label }}</label>
    <textarea
      class="form__element__input"
      :name="name"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    ></textarea>
    <div class="form__element__error" v-if="error">
      <icon-error class="icon" />
      {{ error }}
    </div>
  </div>
</template>
