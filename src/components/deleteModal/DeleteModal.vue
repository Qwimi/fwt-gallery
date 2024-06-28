<script lang="ts" setup>
import { ref, type Ref } from 'vue'

import IconDeleteBig from '@/components/icons/IconDeleteBig.vue'
import router from '@/router'
import ButtonBase from '@/shared/ui/button'
import { useAppStore } from '@/stores/baseStore'
import { useModalStore } from '@/stores/modalStore'

const modalStore = useModalStore()
const store = useAppStore()
const props: Ref<{ id: string; target: string }> = ref(modalStore.currentModalProps)

const deleteFunction = async () => {
  if (await store.deleteArtist(props.value.id)) {
    modalStore.closeModal()
    store.getArtists()
    router.push({ name: 'home' })
    console.log('success')
  } else {
    console.log('error')
  }
}
</script>

<template>
  <div class="modal__content modal--small">
    <icon-delete-big class="icon modal__illustration" />
    <h5 class="modal__title">
      <template v-if="props.target == 'artist'">
        Do you want to delete this artist profile?
      </template>
      <template v-else> Do you want to delete this picture? </template>
    </h5>
    <p class="modal__text">
      <template v-if="props.target == 'artist'">
        You will not be able to recover this profile afterwards.
      </template>
      <template v-else> You will not be able to recover this picture afterwards. </template>
    </p>
    <button-base :variant="'default'" class="modal__button" @click.stop="deleteFunction"
      >delete</button-base
    >
    <button-base :variant="'underline'" @click="modalStore.closeModal">cancel</button-base>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  &__illustration {
    height: 2.5rem;
    width: 2.5rem;
    margin-bottom: 2rem;
  }

  &__content {
    flex-direction: column;
    text-align: center;
    align-items: center;
    padding: 1.25rem 1.5rem;
    height: 100%;
    @media screen and (min-width: $breakpoint-md) {
      padding: 3.75rem 2.5rem;
    }
  }

  &__illustration {
    display: none;

    @media screen and (min-width: $breakpoint-md) {
      display: block;
    }
  }

  &__title {
    color: var(--text-primary);
    @include paragraphBaseMedium;
    margin-bottom: 0.75rem;
  }

  &__text {
    color: var(--gray_9c);
    @include paragraphSmallLight;
    margin-bottom: 1.25rem;
    @media screen and (min-width: $breakpoint-md) {
      margin-bottom: 2rem;
    }
  }

  &__button {
    margin-bottom: 1.25rem;
  }
}
</style>
