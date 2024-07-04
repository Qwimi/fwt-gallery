<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue'

import AvatarUpload from '@/components/AvatarUpload'
import ButtonBase from '@/shared/ui/ButtonBase'
import MultiSelect from '@/shared/ui/MultiSelect'
import TheInput from '@/shared/ui/TheInput'
import TheTextarea from '@/shared/ui/TheTextarea'
import { useAppStore } from '@/stores/baseStore'
import { useModalStore } from '@/stores/modalStore'
import type { ArtistPage, Genre } from '@/stores/types'

const store = useAppStore()
const currentArtist: Ref<ArtistPage> = ref(useModalStore().currentModalProps as ArtistPage)

const name: Ref<string> = ref(currentArtist.value?.name || '')
const yearsOfLife: Ref<string> = ref(currentArtist.value?.yearsOfLife || '')
const description: Ref<string> = ref(currentArtist.value?.description || '')
const selectedGenres: Ref<Genre[]> = ref(currentArtist.value?.genres || [])
const avatar: Ref<string | null> = ref(currentArtist.value?.avatar.src || null)

onMounted(() => {
  store.getGenres()
})
</script>

<template>
  <div class="modal__content">
    <form class="form__container" enctype="multipart/form-data">
      <avatar-upload v-model="avatar" />
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

  @media screen and (min-width: $breakpoint-md) {
    max-width: 340px;
  }

  @media screen and (min-width: $breakpoint-lg) {
    align-items: start;
  }

  &__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    align-items: center;

    @media screen and (min-width: $breakpoint-md) {
      gap: 3.75rem;
    }

    @media screen and (min-width: $breakpoint-lg) {
      flex-direction: row;
      align-items: flex-start;
    }
  }
}
</style>
