<script lang="ts" setup>
import CardItem from '@/shared/ui/CardItem';
import type { CardInterface } from '@/stores/types';

defineProps<{
  cards: CardInterface[];
  isArtists: boolean;
}>();
</script>

<template>
  <section class="card-list">
    <card-item v-for="card in cards" :key="card.id" :is-artist="isArtists" :card="card" />
  </section>
</template>

<style lang="scss" scoped>
.card-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.25rem;
  overflow: hidden;

  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (min-width: $breakpoint-lg) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
</style>
