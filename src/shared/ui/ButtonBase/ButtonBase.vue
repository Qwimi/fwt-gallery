<script lang="ts" setup>
import type { ButtonHTMLAttributes } from 'vue';

defineProps<{
  variant?: 'default' | 'round' | 'underline' | 'icon' | 'icon-always-light';
  buttonProps?: ButtonHTMLAttributes;
}>();
</script>

<template>
  <button class="button" :class="`button--${variant}`" v-bind="buttonProps">
    <span class="button__icon icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </span>
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.button {
  @include buttonMixin;

  &--default {
    padding: 1rem 1.25rem;
    border-radius: 2rem;
    background-color: light-dark(var(--black_12), var(--accent));
    color: var(--white_ff);
    min-width: 12.5rem;

    &:hover,
    &:focus {
      color: var(--white_ff);
      box-shadow: 0 0.25rem 0.5rem light-dark(#00000040, #ab895640);
    }

    &:focus {
      background-color: light-dark(#232323, #ba9052);
    }
  }

  &--icon {
    background-color: var(--background-secondary);
    padding: 0.125rem;
    border-radius: 0.25rem;
  }

  &--icon-always-light {
    color: var(--gray_de);
    text-decoration: underline;
    &:hover,
    &:focus {
      color: var(--white_ff);
    }
  }

  &--icon-always-light &__icon {
    background-color: rgba($color: #fff, $alpha: 0.1);
    border-radius: 0.25rem;
    padding: 0.125rem;
  }

  &--round {
    aspect-ratio: 1;
    padding: 1.125rem;
    border-radius: 100%;
    border: 1px solid light-dark(var(--gray_9c), transparent);
    background-color: var(--background-secondary);
    color: var(--text-secondary);

    &:hover {
      color: var(--text-secondary);
      background-color: light-dark(var(--white_ff), #242222);
      border-color: light-dark(var(--gray_9c), transparent);
    }
  }

  &--underline {
    text-decoration: underline;

    &:disabled {
      opacity: 1;
      color: var(--gray_9c);
    }
  }
}
</style>
