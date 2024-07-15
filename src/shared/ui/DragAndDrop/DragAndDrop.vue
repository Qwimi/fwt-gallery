<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import handleError from '@/helpers/errorHandling';
import ButtonBase from '@/shared/ui/ButtonBase';
import type { Image } from '@/stores/types';

const isDragging: Ref<boolean> = ref(false);
const fileInput = ref<HTMLInputElement | undefined>();
const props = defineProps<{
  modelValue?: Image | File;
  placeholderIcon: typeof import('*.vue');
  button?: string;
  isAvatar?: boolean;
}>();
const emit = defineEmits(['update:modelValue']);

const getUrl = (file: Image | File) => {
  if (file instanceof File) {
    return URL.createObjectURL(file);
  }
  return props.modelValue?.src;
};

const dragenter = () => {
  isDragging.value = true;
};

const dragleave = () => {
  isDragging.value = false;
};

const change = () => {
  const files = fileInput.value?.files;

  if (files) {
    const file = files.item(0);
    if (Math.floor(file!!.size / 1024) >= 3072) {
      handleError('File size is to big');
      return;
    }
    emit('update:modelValue', file);
  }
  isDragging.value = false;
};

const deletePreview = () => {
  emit('update:modelValue', null);
};
</script>

<template>
  <div
    class="drag-n-drop"
    :class="{ 'drag-n-drop--dragging': isDragging, 'drag-n-drop--avatar': isAvatar }"
  >
    <div class="drag-n-drop__area">
      <input
        type="file"
        class="drag-n-drop__input"
        ref="fileInput"
        @dragenter="dragenter"
        @dragleave="dragleave"
        @change="change"
        @drop="dragleave"
        accept=".png, .jpg"
      />
      <template v-if="modelValue">
        <img :src="getUrl(modelValue)" alt="can't load the photo" class="drag-n-drop__preview" />
        <button-base variant="icon" @click.stop="deletePreview" class="drag-n-drop__delete">
          <template #icon>
            <icon-delete class="icon" />
          </template>
        </button-base>
      </template>
      <template v-else>
        <div class="drag-n-drop__icon">
          <component :is="props.placeholderIcon" class="icon--semi-transparent" />
        </div>
        <slot name="whileDragging" v-if="isDragging && $slots.whileDragging"></slot>
        <slot v-else></slot>
      </template>
    </div>
    <button-base
      :variant="'underline'"
      @click.prevent="fileInput?.click()"
      class="drag-n-drop__button"
      v-if="button"
    >
      {{ button }}
    </button-base>
  </div>
</template>

<style lang="scss">
.drag-n-drop {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
  height: 100%;

  &--avatar &__area {
    height: 200px;
    width: 200px;
  }

  &__area {
    border: 1px dashed var(--input-border-hover);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    padding: 0 2rem;
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 100%;
  }

  &__preview {
    width: 100%;
    height: 100%;
    background-color: var(--background-secondary);
    transition: all 0.3s;
  }

  &__area:has(&__preview) {
    border-color: transparent;
    padding: 0;
    border-radius: 0.5rem;
  }

  &__icon {
    height: 3.75rem;
  }

  &__title {
    color: var(--text-secondary);
    text-align: center;
    @include paragraphBaseLight;
  }

  &__subtitle {
    @include paragraphSmallLight;
    color: var(--input-border-hover);
  }

  &__input {
    position: absolute;
    inset: 0;
    z-index: 5;
    opacity: 0;
  }

  &__delete {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    z-index: 6;
  }

  &--dragging {
    background: light-dark(var(--white_ff), var(--black_1a));
    position: absolute;
    inset: 0;
    z-index: 4;
  }

  &--dragging &__area {
    height: 100%;
    width: 100%;
  }

  &--dragging &__button,
  &--dragging &__delete {
    display: none;
  }

  &--dragging &__preview {
    opacity: 0.5;
  }
}
</style>
