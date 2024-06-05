<script lang="ts" setup>
import IconError from '@/components/icons/IconError.vue'
defineProps<{
  label: string
  type: string
  name: string
  placeholder?: string
  error?: string
  theme?: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form__element" :class="`form__element--${theme}`">
    <label class="form__element__label">{{ label }}</label>
    <div class="form__element_input--wrapper">
      <input
        class="form__element__input"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
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
input[type='password']::-ms-reveal,
input[type='password']::-ms-clear {
  display: none;
}
</style>
