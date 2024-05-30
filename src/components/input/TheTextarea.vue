<script lang="ts" setup>
import IconError from '@/components/icons/IconError.vue'
defineProps<{
  label: string
  name: string
  placeholder?: string
  error?: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form__element" :class="{ error: error }">
    <label class="form__element__label">{{ label }}</label>
    <div class="form__element_input--wrapper">
      <textarea
        class="form__element__input"
        :name="name"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      ></textarea>
    </div>
    <div class="form__element__error" v-if="error">
      <icon-error class="icon" />
      {{ error }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.eye-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--secondary-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  &.show {
    visibility: visible;
  }
}
</style>
