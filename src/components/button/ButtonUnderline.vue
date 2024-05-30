<template>
  <button class="button button-underline">
    <span class="button_icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </span>
    <span class="button_text">
      <slot></slot>
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button-underline {
  .button_icon {
    height: 0.75rem;
    width: 0.75rem;
  }
  .button_text {
    border-bottom: 1px solid var(--primary-text-dafault);
  }

  &:hover,
  &:focus {
    color: var(--primary-text-hover);
    .button_text {
      border-color: var(--primary-text-hover);
    }
  }

  &:disabled {
    opacity: 1;
    color: var(--disabled-text);
    .button_text {
      border-color: var(--disabled-text);
    }
  }
}
</style>
