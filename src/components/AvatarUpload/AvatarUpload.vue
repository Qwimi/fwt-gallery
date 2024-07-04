<script lang="ts" setup>
import { ref, type Ref } from 'vue'

import IconDelete from '@/components/icons/IconDelete.vue'
import IconProfile from '@/components/icons/IconProfile.vue'
import ButtonBase from '@/shared/ui/ButtonBase'

const isDragging: Ref<boolean> = ref(false)
const fileInput = ref<HTMLInputElement | undefined>()
const prop = defineProps<{ modelValue?: string }>()
const emit = defineEmits(['update:modelValue'])

const createUrl = (file: File) => {
  if (!file) return prop.modelValue
  let fileSrc = URL.createObjectURL(file)
  setTimeout(() => {
    URL.revokeObjectURL(fileSrc)
  }, 1000)
  return fileSrc
}

const dragover = () => {
  isDragging.value = true
}

const dragleave = () => {
  isDragging.value = false
}

const change = () => {
  const files = fileInput.value?.files
  if (files) emit('update:modelValue', createUrl(files[0]))
  isDragging.value = false
}

const deletePreview = () => {
  emit('update:modelValue', null)
}
</script>
<template>
  <div class="drag-n-drop" :class="{ dragging: isDragging }">
    <div class="drag-n-drop__area">
      <input
        type="file"
        class="drag-n-drop__input"
        id="input"
        ref="fileInput"
        @dragover="dragover"
        @dragleave="dragleave"
        @change="change"
        accept=".png, .jpg"
      />
      <template v-if="modelValue">
        <img :src="modelValue" alt="can't load the photo" class="drag-n-drop__preview" />
        <button-base variant="icon" @click.stop="deletePreview" class="drag-n-drop__delete">
          <template #icon>
            <icon-delete class="icon" />
          </template>
        </button-base>
      </template>
      <template v-else>
        <div class="drag-n-drop__icon">
          <icon-profile class="icon--semi-transparent" />
        </div>
        <template v-if="isDragging">
          <p class="drag-n-drop__title">Drop your image here</p>
          <p class="drag-n-drop__subtitle">Upload only .jpg or .png format less than 3 MB</p>
        </template>
        <template v-else>
          <p class="drag-n-drop__title">You can drop your image here</p>
        </template>
      </template>
    </div>
    <button-base
      :variant="'underline'"
      @click.prevent="fileInput?.click()"
      class="drag-n-drop__button"
    >
      Browse Profile Photo
    </button-base>
  </div>
</template>
<style lang="scss" scoped>
.drag-n-drop {
  @include dragNdrop;

  &__area {
    height: 200px;
    width: 200px;
  }

  &__title {
    color: var(--text-secondary);
    text-align: center;
    @include paragraphBaseLight;
    display: none;
    @media screen and (min-width: $breakpoint-lg) {
      display: block;
    }
  }
}
</style>
