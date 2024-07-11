<script setup lang="ts">
import { reactive } from 'vue';
import IconNoImage from '../icons/IconNoImage.vue';
import ButtonBase from '@/shared/ui/ButtonBase';
import DragAndDrop from '@/shared/ui/DragAndDrop/DragAndDrop.vue';
import TheInput from '@/shared/ui/TheInput';
import { useAppStore } from '@/stores/baseStore';
import { useModalStore } from '@/stores/modalStore';
import type { Painting, PaintingRequestForm } from '@/stores/types';

const store = useAppStore();
const currentPainting: Painting = reactive(useModalStore().currentModalProps as Painting);

const form: PaintingRequestForm = reactive({
  name: currentPainting?.name,
  yearOfCreation: currentPainting?.yearOfCreation,
  image: currentPainting?.image
});

const sentData = async () => {
  currentPainting ? console.log('update') : console.log('create');
};
</script>

<template>
  <div class="modal__content">
    <form class="form" enctype="multipart/form-data" @submit.prevent="sentData">
      <div class="form__inputs">
        <div class="form__inputs--row">
          <the-input type="text" label="The name of the picture" class="form-element--long" />
          <the-input type="text" label="Year of creation" class="form-element--short" />
        </div>
      </div>
      <div class="form__inputs form__inputs--drag-zone">
        <drag-and-drop v-model="form.image" :placeholder-icon="IconNoImage">
          <p class="drag-n-drop__title">
            Drop your image here, or <span class="drag-n-drop__title--underline"> browse </span>
          </p>
          <div class="drag-n-drop__title--underline">browse image</div>
          <p class="drag-n-drop__subtitle">Upload only .jpg or .png format less than 3 MB</p>
        </drag-and-drop>
      </div>
      <button-base :variant="'default'" :button-props="{ type: 'submit' }">save</button-base>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  &__content {
    padding: 3.75rem 1.75rem;
    width: 100vw;

    @media screen and (min-width: $breakpoint-md) {
      max-width: 700px;
      padding: 5rem 100px;
    }
  }
}

.form {
  @include formMixin;
  align-items: center;

  &__inputs {
    &--drag-zone {
      position: relative;
      width: 100%;
      aspect-ratio: $card-aspect-ratio;
      overflow: hidden;
    }
    &--row {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      @media screen and (min-width: $breakpoint-md) {
        flex-direction: row;
        gap: 3rem;
      }
    }
  }

  @media (min-width: $breakpoint-lg) {
    width: 100%;
  }
}

.form-element {
  @media screen and (min-width: $breakpoint-md) {
    &--short {
      max-width: 105px;
    }
    &--long {
      flex: 1;
    }
  }
}
</style>
