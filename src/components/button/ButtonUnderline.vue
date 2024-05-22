<template>
  <button class="button button-underline">
    <span class="button_icon icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </span>
    <span class="button_text">
      <slot></slot>
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button-underline {
  color: var(--primary-text-dafault);
  .button_icon {
    height: 0.75rem;
    width: 0.75rem;
  }
  .button_text {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      height: 1px;
      width: 100%;
      background-color: var(--primary-text-dafault);
    }
  }

  &:hover,
  &:focus {
    color: var(--primary-text-hover);
    &::after {
      color: var(--primary-text-hover);
    }
  }

  &:disabled {
    color: var(--disabled-text);
    &::after {
      color: var(--disabled-text);
    }
  }
}
</style>
