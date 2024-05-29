<script lang="ts" setup>
import IconPhoto from '@/components/icons/IconPhoto.vue'
const props = defineProps({
  isBig: Boolean
})
const elementClass = props.isBig ? 'no-image-big' : ''
</script>
<template>
  <div class="no-image" :class="elementClass">
    <icon-photo class="no-image_icon" />
    <p class="no-image_title">No Image uploaded</p>
  </div>
</template>

<style lang="scss" scoped>
.no-image {
  display: flex;
  gap: 0.75rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--background-secondary);
  height: 100%;
  &_icon {
    height: 3.75rem;
    width: fit-content;
    opacity: 0.2;
  }
  &_title {
    @include inputText;
    opacity: 0.5;
    color: var(--secondary-gray);
  }
}

.no-image-big {
  .no-image_icon {
    height: 14.25rem;
  }
  .no-image_title {
    @include captionBold;
    font-size: 1.25rem;
  }
}

[theme='dark'] {
  .no-image_icon {
    opacity: 0.1;
  }
}
</style>
