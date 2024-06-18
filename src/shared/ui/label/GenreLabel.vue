<script lang="ts" setup>
import IconClose from '@/components/icons/IconClose.vue'
import type { Genre } from '@/stores/types'

defineProps<{
  genre: Genre
  deletable?: boolean
  theme?: string
}>()
</script>

<template>
  <span class="label" :class="`label--${theme}`">
    {{ genre.name }}
    <icon-close class="icon" v-if="deletable" />
  </span>
</template>

<style lang="scss" scoped>
.label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: var(--primary-gray-dark);
  background-color: color-mix(in srgb, var(--primary-black) 5%, transparent);
  border-radius: 2rem;
  border: 1px solid transparent;
  @include paragraphSmallMadium;
  box-sizing: border-box;
  .icon {
    height: 0.75rem;
    width: 0.75rem;
  }
  &--dark {
    color: var(--primary-gray-light);
    background-color: color-mix(in srgb, #cdcdcd 5%, transparent);
    border-color: var(--primary-white);
  }
}
</style>
