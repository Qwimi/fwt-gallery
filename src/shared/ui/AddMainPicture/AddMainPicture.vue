<script lang="ts" setup>
import IconPhoto from '@/components/icons/IconPhoto.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
</script>
<template>
  <div class="add-picture">
    <icon-photo class="icon--semi-transparent add-picture__icon" />
    <button class="add-picture__button"><icon-plus class="icon" /></button>
  </div>
</template>
<style lang="scss" scoped>
.add-picture {
  aspect-ratio: 98/65;
  position: relative;
  border: 1px dashed var(--input-border-hover);
  background-color: var(--background-secondary);
  align-self: flex-start;
  width: 100%;
  padding: 1rem;
  margin-bottom: 4rem;
  cursor: pointer;

  @media screen and (min-width: $breakpoint-md) {
    margin-bottom: 6.75rem;
    padding: 2rem;
    width: 50%;
  }

  @media screen and (min-width: $breakpoint-lg) {
    padding: 3rem;
    width: 33.33%;
  }

  &__icon {
    height: 100%;
    width: auto;
  }

  &__button {
    @include buttonMixin;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    background-color: var(--accent);
    color: var(--gray_de);
    padding: 0.75rem;
    border-radius: 50%;
  }
}
</style>
