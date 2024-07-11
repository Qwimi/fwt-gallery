<script lang="ts" setup>
import ExpandableText from '@/shared/ui/ExpandableText';
import GenreLabel from '@/shared/ui/GenreLabel';
import NoImage from '@/shared/ui/NoImage';
import type { ArtistPage } from '@/stores/types';

defineProps<{
  artist: ArtistPage;
}>();
</script>

<template>
  <section class="artist-section">
    <div class="artist-section__avatar">
      <img :src="artist?.avatar?.src" alt="can't load the picture" v-if="artist?.avatar" />
      <no-image :is-big="true" v-else />
    </div>
    <div class="biography">
      <div class="biography__wrapper">
        <div class="biography__header">
          <p class="biography__date">{{ artist.yearsOfLife }}</p>
          <p class="biography__name">{{ artist.name }}</p>
        </div>
        <div class="biography__content">
          <div class="biography__main">
            <expandable-text :text="artist.description" />
          </div>
          <div class="biography__genres">
            <genre-label
              v-for="genre in artist.genres"
              :key="genre._id"
              :genre="genre"
              :deletable="false"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.artist-section {
  display: flex;
  flex-direction: column;
  justify-content: end;
  position: relative;
  margin-bottom: 3.75rem;

  @media (min-width: $breakpoint-lg) {
    flex-direction: row;
  }

  &__avatar {
    width: 100%;
    height: 28.5rem;
    overflow: hidden;
    img {
      height: 100%;
    }

    @media (min-width: $breakpoint-md) {
      height: 500px;
      img {
        height: auto;
      }
    }

    @media (min-width: $breakpoint-lg) {
      width: fit-content;
      height: 1000px;
      img {
        height: 100%;
      }
      aspect-ratio: 1;
    }
  }
}

.biography {
  position: relative;

  @media (min-width: $breakpoint-lg) {
    position: absolute;
    inset: 0;
    max-width: 1240px;
    margin: 0 auto;

    &__wrapper {
      max-width: 604px;
      background-color: var(--background-primary);
      padding: 3.25rem 5rem;
      margin-top: 3.25rem;
    }

    &__content,
    &__header {
      padding: 0;
    }
  }

  &__header {
    position: absolute;
    top: 0;
    transform: translateY(-100%);
    width: calc(100% - 1.25rem);
    max-width: 560px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.25rem;
    background-color: var(--background-primary);

    @media (min-width: $breakpoint-md) {
      gap: 0.75rem;
    }

    @media (min-width: $breakpoint-lg) {
      gap: 2rem;
      transform: translateY(0);
      position: static;
      width: 100%;
      max-width: none;
      margin-bottom: 3.25rem;
      padding: 0;
    }
  }

  &__date {
    color: light-dark(var(--gray_57), var(--gray_9c));
    @include captionMedium12;

    @media (min-width: $breakpoint-md) {
      @include captionMedium16;
    }
  }

  &__name {
    @include headingH3;
    color: var(--accent);
    position: relative;

    @media (min-width: $breakpoint-md) {
      @include headingH2;
      &::before {
        content: '';
        height: 100%;
        width: 2px;
        position: absolute;
        top: 0;
        left: -1.25rem;
        background: var(--accent);
      }
    }

    @media (min-width: $breakpoint-lg) {
      @include headingH1;
      &::before {
        left: -5rem;
      }
    }
  }

  &__content {
    padding: 1.25rem 1.25rem 0;
    position: relative;

    @media (min-width: $breakpoint-lg) {
      padding: 0;
      &::before {
        content: '';
        position: absolute;
        top: -1.25rem;
        left: 0;
        height: 2px;
        width: 2rem;
        background-color: var(--text-secondary);
      }
    }
  }

  &__main {
    margin-bottom: 2rem;
  }

  &__genres {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    @media (min-width: $breakpoint-md) {
      gap: 1.25rem;
    }
  }
}
</style>
