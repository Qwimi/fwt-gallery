<script lang="ts" setup>
import IconPhoto from '@/components/icons/IconPhoto.vue';

defineProps<{
  isBig?: boolean;
}>();
</script>

<template>
  <div class="no-image" :class="{ 'no-image--big': isBig }">
    <icon-photo class="no-image__icon" />
    <p class="no-image__title">No Image uploaded</p>
  </div>
</template>

<style lang="scss" scoped>
.no-image {
  display: flex;
  gap: 0.75rem;
  flex-direction: column;
  align-items: center;
  padding-top: 3.75rem;
  background-color: var(--background-secondary);
  height: 100%;

  &__icon {
    height: 3.75rem;
    width: fit-content;
    opacity: 0.2;
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
}

[theme='dark'] .no-image__icon {
  opacity: 0.1;
}
</style>
