<script lang="ts" setup>
import type { ButtonProps } from '@/stores/types'
defineProps<ButtonProps>()
</script>

<template>
  <button class="button" :class="`button--${variant}`">
    <span class="button_icon icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </span>
    <span class="button_text" v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button {
  @include buttonMixin;

  &--default {
    padding: 1rem 1.25rem;
    border-radius: 2rem;
    background-color: var(--background-button);
    color: var(--primary-white);
    min-width: 12.5rem;
    &:hover,
    &:focus {
      box-shadow: 0 0.25rem 0.5rem rgba($color: #000000, $alpha: 0.25);
    }
  }

  &--icon {
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

  &--round {
    aspect-ratio: 1/1;
    padding: 1.125rem;
    border: 1px solid var(--secondary-gray);
    border-radius: 100%;
    background-color: var(--background-secondary);
    &:hover {
      background-color: var(--background);
    }
    .icon {
      rotate: 270deg;
    }
  }

  [theme='dark'] {
    .round {
      border: none;
    }
  }

  &--underline {
    .button_text {
      border-bottom: 1px solid var(--primary-text-dafault);
    }

    &:hover,
    &:focus {
      color: var(--primary-text-hover);
      border-color: var(--primary-text-hover);
    }

    &:disabled {
      opacity: 1;
      color: var(--disabled-text);
      .button_text {
        border-color: var(--disabled-text);
      }
    }
  }
}
</style>
