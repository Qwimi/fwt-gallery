<script lang="ts" setup>
import ImageUpload from '../../shared/ui/ImageUpload/ImageUpload.vue';
import IconNoImage from '../icons/IconNoImage.vue';
import type { Image } from '@/stores/types';

const prop = defineProps<{ modelValue?: Image | File }>();
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <ImageUpload
    :modelValue="prop.modelValue"
    :placeholderIcon="IconNoImage"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <p class="drag-n-drop__title">
      Drop your image here, or <span class="drag-n-drop__title--underline"> browse </span>
    </p>
    <div class="drag-n-drop__title--underline">browse image</div>
    <p class="drag-n-drop__subtitle">Upload only .jpg or .png format less than 3 MB</p>
  </ImageUpload>
</template>

<style lang="scss" scoped>
.drag-n-drop {
  &__title {
    display: none;

    @media screen and (min-width: $breakpoint-md) {
      display: block;
    }

    &--underline {
      @include paragraphBaseMedium;
      text-decoration: underline;
      display: inherit;
    }
  }

  &__title + &__title--underline {
    display: block;

    @media screen and (min-width: $breakpoint-md) {
      display: none;
    }
  }
}
</style>
