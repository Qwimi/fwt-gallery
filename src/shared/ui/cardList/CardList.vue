<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';
import CardSettings from '@/components/CardSettings';
import router from '@/router';
import CardSkeleton from '@/shared/ui/CardSkeleton';
import type { CardInterface } from '@/stores/types';

const CardItem = defineAsyncComponent(() => import('@/shared/ui/CardItem'));

const props = defineProps<{
  cards: CardInterface[];
  variant: 'artists' | 'paintings';
}>();

const emit = defineEmits(['openSlider', 'makeTheCover', 'editPic', 'deletePic']);

const cardClick = (event: string) => {
  if (props.variant === 'artists') {
    router.push({ name: 'artist', params: { id: event } });
  } else {
    emit('openSlider', event);
  }
};
</script>

<template>
  <section class="card-list">
    <suspense>
      <template #default>
        <card-item v-for="card in cards" :key="card.id" :card="card" @click="cardClick">
          <card-settings
            v-if="props.variant === 'paintings'"
            :card="card.id"
            @click.stop
            @edit-pic="$emit('editPic', card)"
            @delete-pic="$emit('deletePic', card.id)"
            @make-the-cover="$emit('makeTheCover', card.id)"
          />
        </card-item>
      </template>
      <template #fallback>
        <card-skeleton v-for="i in 6" :key="i" />
      </template>
    </suspense>
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
