<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue'

import IconProfile from '@/components/icons/IconProfile.vue'
import ButtonBase from '@/shared/ui/button'
import MultiSelect from '@/shared/ui/multiSelect'
import TheInput from '@/shared/ui/theInput'
import TheTextarea from '@/shared/ui/theTextarea'
import { useAppStore } from '@/stores/baseStore'
import { useModalStore } from '@/stores/modalStore'
import type { ArtistPage, Genre } from '@/stores/types'

const store = useAppStore()
const currentArtist: Ref<ArtistPage> = ref(useModalStore().currentModalProps as ArtistPage)

const name: Ref<string> = ref(currentArtist.value?.name || '')
const yearsOfLife: Ref<string> = ref(currentArtist.value?.yearsOfLife || '')
const description: Ref<string> = ref(currentArtist.value?.description || '')
const selectedGenres: Ref<Genre[]> = ref(currentArtist.value?.genres || [])

onMounted(() => {
  store.getGenres()
})
</script>

<template>
  <div class="modal__content">
    <form class="form__container">
      <div class="drag-n-drop">
        <div class="drag-n-drop__area">
          <div class="drag-n-drop__icon">
            <icon-profile class="icon--semi-transparent" />
          </div>
          <p class="drag-n-drop__title">You can drop your image here</p>
        </div>
        <button-base :variant="'underline'">Browse Profile Photo</button-base>
      </div>
      <div class="form">
        <div class="form__inputs">
          <the-input :label="'Name*'" :type="'text'" v-model="name" />
          <the-input :label="'Years of life'" :type="'text'" v-model="yearsOfLife" />
          <the-textarea :label="'Description'" v-model="description" />
          <multi-select :label="'Genres*'" :options="store.genres" v-model="selectedGenres" />
        </div>
        <button-base :variant="'default'">save</button-base>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  &__content {
    padding: 3.75rem 1.75rem;
    width: 100vw;

    @media screen and (min-width: $breakpoint-lg) {
      max-width: 800px;
      padding: 5rem 100px;
    }
  }
}

.form {
  @include formMixin;
  align-items: center;

  @media screen and (min-width: $breakpoint-lg) {
    align-items: start;
    max-width: 340px;
  }

  &__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    @media screen and (min-width: $breakpoint-md) {
      gap: 3.75rem;
    }

    @media screen and (min-width: $breakpoint-lg) {
      flex-direction: row;
    }
  }
}

.drag-n-drop {
  @include dragNdrop;
  &__area {
    height: 200px;
    width: 200px;
  }
  &__title {
    display: none;
    @media screen and (min-width: $breakpoint-lg) {
      display: block;
    }
  }
}
</style>
