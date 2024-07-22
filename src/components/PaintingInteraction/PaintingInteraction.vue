<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { computed, reactive, ref, type ComputedRef, type Ref } from 'vue';
import IconNoImage from '@/components/icons/IconNoImage.vue';
import { toFormData } from '@/helpers/formActions';
import { paintingRules, useValidationErrors } from '@/helpers/validation';
import ButtonBase from '@/shared/ui/ButtonBase';
import DragAndDrop from '@/shared/ui/DragAndDrop/DragAndDrop.vue';
import TheInput from '@/shared/ui/TheInput';
import { useAppStore } from '@/stores/baseStore';
import { useModalStore } from '@/stores/modalStore';
import type { CardInterface, PaintingRequestForm } from '@/stores/types';

interface PaintingProps extends CardInterface {
  target(id: string, form: FormData, paintingId?: string): void;
  target(id: string, form: FormData, paintingId?: string): void;
}

const store = useAppStore();
const props: Ref<PaintingProps> = ref(useModalStore().currentModalProps as PaintingProps);

const form: PaintingRequestForm = reactive({
  name: props.value.name,
  yearOfCreation: props.value.date,
  image: props.value.image
});

const $v = useVuelidate(paintingRules, form);

const errors: ComputedRef<PaintingRequestForm> = computed(() =>
  useValidationErrors($v.value.$errors)
);

const sentData = async () => {
  const isValid = await $v.value.$validate();

  if (!isValid) return;

  const id = store.currentArtist?._id;
  const formData = toFormData(form);
  props.value.target(id!, formData, props.value.id);
};
</script>

<template>
  <div class="modal__content">
    <form
      class="form"
      enctype="multipart/form-data"
      @submit.prevent="sentData"
      @keydown.enter.prevent
    >
      <div class="form__inputs">
        <div class="form__inputs--row">
          <the-input
            v-model="form.name"
            type="text"
            label="The name of the picture"
            class="form-element--long"
            :error="errors.name"
          />
          <the-input
            v-model="form.yearOfCreation"
            type="number"
            label="Year of creation"
            class="form-element--short"
            :error="errors.yearOfCreation"
          />
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
    padding: 5rem 1.75rem;
    width: 100vw;

    @media (min-width: $breakpoint-md) {
      padding: 5rem 100px;
    }

    @media (min-width: $breakpoint-lg) {
      max-width: 700px;
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
      aspect-ratio: 98/65;
      overflow: hidden;
    }
    &--row {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      @media (min-width: $breakpoint-md) {
        flex-direction: row;
        gap: 3rem;
      }
    }
  }

  @media (min-width: $breakpoint-md) {
    width: 100%;
  }
}

.form-element {
  @media (min-width: $breakpoint-md) {
    &--short {
      max-width: 105px;
    }
    &--long {
      flex: 1;
    }
  }
}

.drag-n-drop {
  &__title {
    display: none;

    @media (min-width: $breakpoint-md) {
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

    @media (min-width: $breakpoint-md) {
      display: none;
    }
  }
}
</style>
