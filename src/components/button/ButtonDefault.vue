<template>
  <button class="button button-default">
    <span class="button_icon icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </span>
    <span class="button_text">
      <slot></slot>
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button-default {
  padding: 1rem 1.25rem;
  border-radius: 2rem;
  background-color: var(--background-button);
  color: var(--primary-white);
  min-width: 12.5rem;
  &:hover,
  &:focus {
    box-shadow: 0 0.25rem 0.5rem rgba($color: #000000, $alpha: 0.25);
  }
  &:disabled {
    opacity: 0.5;
  }
}
</style>
