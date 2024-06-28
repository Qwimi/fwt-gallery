<script lang="ts" setup>
import IconPhoto from '@/components/icons/IconPhoto.vue'
defineProps<{
  isBig?: Boolean
}>()
</script>

<template>
  <div class="no-image" :class="{ 'no-image--big': isBig }">
    <icon-photo class="no-image__icon icon--semi-transparent" />
    <p class="no-image__title">No Image uploaded</p>
  </div>
</template>

<style lang="scss" scoped>
.no-image {
  display: flex;
  gap: 0.75rem;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  background-color: var(--background-secondary);
  height: 100%;

  &__icon {
    height: 3.75rem;
    width: fit-content;
  }

  &__title {
    @include inputText;
    opacity: 0.5;
    color: var(--gray_9c);
  }

  &--big {
    padding: 0;
    justify-content: center;
    gap: 2rem;

    .no-image__icon {
      height: 14.25rem;
    }

    .no-image__title {
      @include captionBold;
      font-size: 1.25rem;
    }
  }

  @media screen and (min-width: $breakpoint-md) {
    padding-top: 2.5rem;
  }

  @media screen and (min-width: $breakpoint-lg) {
    padding-top: 3.75rem;
  }
}
</style>
