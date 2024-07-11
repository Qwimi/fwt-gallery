<script lang="ts" setup>
import IconArrowDecoration from '@/components/icons/IconArrowDecoration.vue';
import NoImage from '@/shared/ui/NoImage';
import type { CardInterface } from '@/stores/types';

defineProps<{
  card: CardInterface;
  isArtist: boolean;
}>();
</script>

<template>
  <article class="card">
    <router-link
      :to="{ name: 'artist', params: { id: card.id } }"
      v-if="isArtist"
      class="card__link"
    />
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

  &__link {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 1;
  }

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

  &__info {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0.5rem 0;
    width: 85%;
    max-width: 300px;
    background-color: var(--background-primary);

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
    position: relative;
    padding: 0 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media (min-width: $breakpoint-lg) {
      padding: 0 1.25rem;

      &::before {
        content: '';
        height: 100%;
        width: 2px;
        background-color: var(--accent);
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }

  &__title {
    color: var(--text-primary);
    @include headingH6;

    @media (min-width: $breakpoint-md) {
      @include headingH4;
    }
  }

  &__date {
    color: var(--accent);
    @include captionBold;

    @media (min-width: $breakpoint-md) {
      @include buttonText;
    }
  }

  @media (min-width: $breakpoint-lg) {
    &--decoration {
      display: none;
    }
  }
}
</style>
