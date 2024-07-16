<script lang="ts" setup>
import CardSettings from '@/components/CardSettings';
import router from '@/router';
import CardItem from '@/shared/ui/CardItem';
import { useAppStore } from '@/stores/baseStore';
import type { CardInterface } from '@/stores/types';

const props = defineProps<{
  cards: CardInterface[];
  isArtists: boolean;
}>();

const emit = defineEmits(['openSlider', 'makeTheCover', 'editPic', 'deletePic']);

const cardClick = (event: string) => {
  if (props.isArtists) {
    router.push({ name: 'artist', params: { id: event } });
  } else {
    emit('openSlider', event);
  }
};
</script>

<template>
  <section class="card-list">
    <card-item v-for="card in cards" :key="card.id" :card="card" @click="cardClick">
      <card-settings
        v-if="!isArtists"
        :card="card"
        :main-painting="useAppStore().currentArtist.mainPainting?._id"
        @click.stop
        @edit-pic="$emit('editPic', $event)"
        @delete-pic="$emit('deletePic', $event)"
        @make-the-cover="$emit('makeTheCover', $event)"
      />
    </card-item>
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
