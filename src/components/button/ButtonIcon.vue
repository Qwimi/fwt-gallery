<script lang="ts" setup>
defineProps({
  isDisabled: Boolean
})
</script>

<template>
  <button class="button button-icon" :disabled="isDisabled">
    <span class="button_icon icon">
      <slot></slot>
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button-icon {
  background-color: var(--background-secondary);
  padding: 0.125rem;
  border-radius: 0.25rem;
  color: var(--primary-text-dafault);
  &:hover,
  &:focus {
    &::after {
      color: var(--primary-text-hover);
    }
  }
  &:disabled {
    opacity: 0.5;
  }
}
</style>
