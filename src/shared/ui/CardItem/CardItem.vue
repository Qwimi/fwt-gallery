<script lang="ts" setup>
import IconArrowDecoration from '@/components/icons/IconArrowDecoration.vue';
import NoImage from '@/shared/ui/NoImage';
import type { CardInterface } from '@/stores/types';

defineProps<{
  card: CardInterface;
}>();

defineEmits({ click: (id: string) => id });
</script>

<template>
  <article class="card" @click="$emit('click', card.id)">
    <slot></slot>
    <img :src="card?.image" alt="Can't load the picture" v-if="card?.image" class="card__img" />
    <no-image v-else />
    <div class="card__info">
      <div class="card__text">
        <p class="card__title">{{ card?.name }}</p>
        <p class="card__date">{{ card?.date }}</p>
      </div>
      <div class="card--decoration">
        <icon-arrow-decoration class="arrow-icon icon" />
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.card {
  aspect-ratio: 98/65;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &__img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: all 0.5s ease-out;
  }

  &:hover {
    img {
      scale: 1.03;
    }
  }

  @include descriptionMixin;

  &__info {
    bottom: 0;
    left: 0;
    padding: 0.5rem 0;
    width: 85%;
    max-width: 300px;

    @media (min-width: $breakpoint-md) {
      padding: 0.75rem 0;
    }

    @media (min-width: $breakpoint-lg) {
      padding: 1.25rem 0;
    }
  }

  &--decoration {
    height: 100%;
    width: 1.5rem;
    background: var(--accent);
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gray_de);

    .icon-arrow {
      width: 100%;
    }
  }

  &__text {
    padding: 0 0.75rem;

    &::before {
      display: none;
    }

    @media (min-width: $breakpoint-lg) {
      padding: 0 1.25rem;

      &::before {
        display: block;
      }
    }
  }

  @media (min-width: $breakpoint-lg) {
    &--decoration {
      display: none;
    }
  }
}
</style>
