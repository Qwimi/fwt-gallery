<script lang="ts" setup>
import type { PropType } from 'vue'
import IconArrowDecoration from '@/components/icons/IconArrowDecoration.vue'
import type { CardInterface } from '@/stores/types'
import NoImage from '@/components/noImg/NoImage.vue'

const props = defineProps({
  card: Object as PropType<CardInterface>,
  isArtist: Boolean
})
const artistUrl = `/artist/${props.card?.id}`
</script>

<template>
  <article class="card">
    <router-link :to="artistUrl" v-if="isArtist" class="card_link" />
    <img :src="card?.image" alt="Can't load the picture" v-if="card?.image" class="card_img" />
    <no-image v-else />
    <div class="card_info">
      <div class="card_about">
        <p class="card_about_title">{{ card?.name }}</p>
        <p class="card_about_date">{{ card?.date }}</p>
      </div>
      <div class="card_info-decoration">
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
  &_link {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 1;
  }

  &_img {
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

  &_info {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0.5rem 0;
    width: 85%;
    max-width: 300px;
    background-color: var(--background);

    @media screen and (min-width: $breakpoint-md) {
      padding: 0.75rem 0;
    }
    &-decoration {
      content: '';
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
      color: var(--primary-gray-l);

      .icon-arrow {
        width: 100%;
      }
    }

    @media screen and (min-width: $breakpoint-lg) {
      padding: 1.25rem 0;
      &-decoration {
        display: none;
      }
    }
  }
}

.card_about {
  position: relative;
  padding: 0 0.75rem;
  @media screen and (min-width: $breakpoint-lg) {
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
  &_title {
    color: var(--primary-text-hover);
    @include headingH6;

    @media screen and (min-width: $breakpoint-md) {
      @include headingH4;
    }
  }
  &_date {
    color: var(--accent);
    @include captionBold;
    @media screen and (min-width: $breakpoint-md) {
      @include buttonText;
    }
  }
}
</style>
