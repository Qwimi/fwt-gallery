<script lang="ts" setup>
defineProps<{ variant: 'default' | 'round' | 'underline' | 'icon'; theme?: string }>()
</script>

<template>
  <button class="button" :class="[`button--${variant}`, `button--${theme}`]">
    <span class="button__icon icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </span>
    <span class="button__text" v-if="$slots.default">
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
    background-color: var(--primary-black);
    color: var(--primary-white);
    min-width: 12.5rem;
    &:hover,
    &:focus {
      color: var(--primary-white);
      box-shadow: 0 0.25rem 0.5rem rgba($color: #000000, $alpha: 0.25);
    }
    &:focus {
      background-color: #232323;
    }
    &.button--dark {
      background-color: var(--accent-gold);
      &:hover,
      &:focus {
        color: var(--primary-white);
        box-shadow: 0 0.25rem 0.5rem color-mix(in srgb, var(--accent-gold) 40%, transparent);
      }
      &:focus {
        background-color: #ba9052;
      }
    }
  }

  &--icon {
    background-color: var(--secondary-white);
    padding: 0.125rem;
    border-radius: 0.25rem;
    &.button--dark {
      background-color: var(--secondary-black);
    }
  }

  &--round {
    aspect-ratio: 1/1;
    padding: 1.125rem;
    border-radius: 100%;
    border: 1px solid var(--secondary-gray);
    background-color: var(---secondary-white);
    color: var(--primary-gray-light);
    &:hover {
      background-color: var(--primary-white);
      border-color: var(--secondary-gray);
      color: var(--primary-gray-dark);
    }
    .icon {
      rotate: 270deg;
    }
    &.button--dark {
      background-color: var(--secondary-black);
      border-color: transparent;
      color: var(--primary-gray-light);
      &:hover {
        background-color: #242222;
      }
    }
  }

  &--underline {
    .button__text {
      border-bottom: 1px solid;
    }
    &:disabled {
      opacity: 1;
      color: var(--secondary-gray);
      .button__text {
        border-color: var(--secondary-gray);
      }
    }
  }
}
</style>
