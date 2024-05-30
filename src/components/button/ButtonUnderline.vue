<template>
  <button class="button button--underline">
    <span class="button__icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </span>
    <span class="button__text">
      <slot></slot>
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button--underline {
  .button__icon {
    height: 0.75rem;
    width: 0.75rem;
  }
  .button__text {
    border-bottom: 1px solid var(--primary-text-dafault);
  }

  &:hover,
  &:focus {
    color: var(--primary-text-hover);
    .button__text {
      border-color: var(--primary-text-hover);
    }
  }

  &:disabled {
    opacity: 1;
    color: var(--disabled-text);
    .button__text {
      border-color: var(--disabled-text);
    }
  }
}
</style>
