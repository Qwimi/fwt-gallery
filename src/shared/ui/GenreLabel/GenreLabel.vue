<script lang="ts" setup>
import IconClose from '@/components/icons/IconClose.vue';
import type { Genre } from '@/stores/types';

defineProps<{
  genre: Genre;
  variant?: string;
}>();
</script>

<template>
  <span class="label">
    {{ genre.name }}
    <icon-close class="icon" v-if="variant === 'deletable'" />
  </span>
</template>

<style lang="scss" scoped>
.label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  height: fit-content;
  padding: 0.5rem 1rem;
  color: var(--text-secondary);
  background-color: var(--background-semi-transparent);
  border-radius: 2rem;
  border: 1px solid light-dark(transparent, var(--white_ff));

  @include paragraphSmallMedium;

  .icon {
    height: 0.75rem;
    width: 0.75rem;
  }
}
</style>
