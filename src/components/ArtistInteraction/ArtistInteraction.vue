<script lang="ts" setup>
import useVuelidate from '@vuelidate/core';
import { computed, reactive, type ComputedRef } from 'vue';
import IconProfile from '@/components/icons/IconProfile.vue';
import { toFormData } from '@/helpers/formActions';
import { artistRules, useValidationErrors } from '@/helpers/validation';
import ButtonBase from '@/shared/ui/ButtonBase';
import DragAndDrop from '@/shared/ui/DragAndDrop';
import MultiSelect from '@/shared/ui/MultiSelect';
import TheInput from '@/shared/ui/TheInput';
import TheTextarea from '@/shared/ui/TheTextarea';
import { useAppStore } from '@/stores/baseStore';
import { useModalStore } from '@/stores/modalStore';
import type { ArtistPage, Genre, ArtistRequestForm } from '@/stores/types';

const store = useAppStore();
const currentArtist: ArtistPage = reactive(useModalStore().currentModalProps as ArtistPage);

const form: ArtistRequestForm = reactive({
  name: currentArtist?.name,
  yearsOfLife: currentArtist?.yearsOfLife,
  description: currentArtist?.description,
  genres: currentArtist?.genres.map((element: Genre) => element._id),
  avatar: currentArtist?.avatar
});

const $v = useVuelidate(artistRules, form);

const errors: ComputedRef<ArtistRequestForm> = computed(() =>
  useValidationErrors($v.value.$errors)
);

const sentData = async () => {
  const isValid = await $v.value.$validate();

  if (!isValid) return;

  const formData = toFormData(form);

  if (currentArtist) await store.updateArtist(currentArtist._id, formData);
  else await store.createArtist(formData);
};
</script>

<template>
  <div class="modal__content">
    <form
      class="form__container"
      enctype="multipart/form-data"
      @submit.prevent="sentData"
      @keydown.enter.prevent
    >
      <drag-and-drop
        v-model="form.avatar"
        :placeholder-icon="IconProfile"
        variant="avatar"
        button="Browse Profile Photo"
      >
        <p class="drag-n-drop__title">You can drop your image here</p>
        <template #whileDragging>
          <p class="drag-n-drop__title">Drop your image here</p>
          <p class="drag-n-drop__subtitle">Upload only .jpg or .png format less than 3 MB</p>
        </template>
      </drag-and-drop>
      <div class="form">
        <div class="form__inputs">
          <the-input label="Name*" type="text" v-model="form.name" :error="errors.name" />
          <the-input
            label="Years of life"
            type="text"
            v-model="form.yearsOfLife"
            :error="errors.yearsOfLife"
          />
          <the-textarea
            label="Description"
            v-model="form.description"
            :error="errors.description"
          />
          <multi-select
            label="Genres*"
            :options="store.genres"
            v-model="form.genres"
            :error="errors.genres"
          />
        </div>
        <button-base variant="default" :button-props="{ type: 'submit' }">save</button-base>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  &__content {
    padding: 3.75rem 1.75rem;
    width: 100vw;

    @media (min-width: $breakpoint-lg) {
      max-width: 800px;
      padding: 5rem 100px;
    }
  }
}

.form {
  @include formMixin;
  align-items: center;

  @media (min-width: $breakpoint-lg) {
    align-items: start;
  }

  &__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    align-items: center;

    @media (min-width: $breakpoint-md) {
      gap: 3.75rem;
    }

    @media (min-width: $breakpoint-lg) {
      flex-direction: row;
      align-items: flex-start;
    }
  }
}
</style>
