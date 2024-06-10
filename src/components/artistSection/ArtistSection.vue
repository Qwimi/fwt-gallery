<script lang="ts" setup>
import ArtistBiography from '@/components/artistBiography/ArtistBiography.vue'
import type { ArtistPage } from '@/stores/types'
import NoImage from '@/components/noImg/NoImage.vue'
import IconArrowDecoration from '@/components/icons/IconArrowDecoration.vue'

defineProps<{
  artist?: ArtistPage
  theme?: string
}>()
</script>

<template>
  <section class="artist--section">
    <router-link :to="{ name: 'home' }" class="link">
      <icon-arrow-decoration class="icon" />
      <span class="link__text">back</span>
    </router-link>
    <div class="artist--section__avatar">
      <img :src="artist?.avatar?.src" alt="" v-if="artist?.avatar?.src" />
      <no-image v-else />
    </div>
    <artist-biography
      :name="artist?.name"
      :years-of-life="artist?.yearsOfLife"
      :biography="artist?.description"
      :genres="artist?.genres"
      :theme="theme"
    />
  </section>
</template>

<style lang="scss" scoped>
.artist--section {
  display: flex;
  flex-direction: column;
  justify-content: end;
  position: relative;
  margin-bottom: 3.75rem;

  @media screen and (min-width: $breakpoint-lg) {
    flex-direction: row;
  }

  &__avatar {
    width: 100%;
    max-height: 28.5rem;
    overflow: hidden;
    @media screen and (min-width: $breakpoint-md) {
      max-height: 500px;
    }
    @media screen and (min-width: $breakpoint-lg) {
      max-height: none;
      width: fit-content;
      height: 1000px;
      aspect-ratio: 1/1;
    }
  }
}

.link {
  position: absolute;
  top: -0.75rem;
  transform: translateY(-100%);
  left: 1.25rem;
  display: flex;
  align-items: center;
  @media screen and (min-width: $breakpoint-lg) {
    left: calc((100vw - 1240px) / 2);
  }
  &__text {
    @include buttonText;
    display: none;
    @media screen and (min-width: $breakpoint-md) {
      display: inline;
    }
  }
  .icon {
    margin-right: 0.75rem;
    rotate: 180deg;
  }
}
</style>
