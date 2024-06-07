<script lang="ts" setup>
import IconArrowDecoration from '@/components/icons/IconArrowDecoration.vue'
import type { CardInterface } from '@/stores/types'
import NoImage from '@/components/noImg/NoImage.vue'

defineProps<{
  card: CardInterface
  isArtist: Boolean
  theme?: string
}>()
</script>

<template>
  <article class="card" :class="`card--${theme}`">
    <router-link
      :to="{ name: 'artist', params: { id: card.id } }"
      v-if="isArtist"
      class="card__link"
    />
    <img :src="card?.image" alt="Can't load the picture" v-if="card?.image" class="card__img" />
    <no-image v-else />
    <div class="card__info">
      <div class="card__about">
        <p class="card__about__title">{{ card?.name }}</p>
        <p class="card__about__date">{{ card?.date }}</p>
      </div>
      <div class="card__info--decoration">
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
}

.card__about {
  position: relative;
  padding: 0 0.75rem;
  @media screen and (min-width: $breakpoint-lg) {
    padding: 0 1.25rem;

    &::before {
      content: '';
      height: 100%;
      width: 2px;
      background-color: var(--accent-red);
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  &__title {
    color: var(--primary-black);
    @include headingH6;

    @media screen and (min-width: $breakpoint-md) {
      @include headingH4;
    }
  }
  &__date {
    color: var(--accent-red);
    @include captionBold;
    @media screen and (min-width: $breakpoint-md) {
      @include buttonText;
    }
  }
}

.card__info {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.5rem 0;
  width: 85%;
  max-width: 300px;
  background-color: var(--primary-white);

  @media screen and (min-width: $breakpoint-md) {
    padding: 0.75rem 0;
  }
  &--decoration {
    content: '';
    height: 100%;
    width: 1.5rem;
    background-color: var(--accent-red);
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-gray-light);

    .icon-arrow {
      width: 100%;
    }
  }

  @media screen and (min-width: $breakpoint-lg) {
    padding: 1.25rem 0;
    &--decoration {
      display: none;
    }
  }
}

.card--dark {
  .card__info {
    background-color: var(--primary-black);
    &--decoration {
      background-color: var(--accent-gold);
    }
  }
  .card__about {
    &::before {
      background-color: var(--accent-gold);
    }
    &__title {
      color: var(--primary-white);
    }
    &__date {
      color: var(--accent-gold);
    }
  }
}
</style>
