<script lang="ts" setup>
import IconProfile from '@/components/icons/IconProfile.vue';
import ImageUpload from '@/shared/ui/ImageUpload/ImageUpload.vue';
import type { Image } from '@/stores/types';

const prop = defineProps<{ modelValue?: Image | File }>();
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <ImageUpload
    :modelValue="prop.modelValue"
    :placeholderIcon="IconProfile"
    @update:modelValue="emit('update:modelValue', $event)"
    button="Browse Profile Photo"
    :isAvatar="true"
  >
    <template #default>
      <p class="drag-n-drop__title">Drop your image here</p>
    </template>
    <template #whileDragging>
      <p class="drag-n-drop__title">You can drop your image here</p>
      <p class="drag-n-drop__subtitle">Upload only .jpg or .png format less than 3 MB</p>
    </template>
  </ImageUpload>
</template>
