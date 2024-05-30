<template>
  <button class="button button-icon">
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
  &:hover,
  &:focus {
    &::after {
      color: var(--primary-text-hover);
    }
  }
}
</style>
