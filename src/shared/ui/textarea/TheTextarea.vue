<script lang="ts" setup>
defineProps<{
  label: string
  name: string
  placeholder?: string
  theme?: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form__element" :class="`form__element--${theme}`">
    <label class="form__element__label">{{ label }}</label>
    <textarea
      class="form__element__input"
      :name="name"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    ></textarea>
  </div>
</template>

<style lang="scss" scoped>
.form__element {
  @include inputMixin;
  &__input {
    height: 150px;
    resize: none;
  }
}
</style>
