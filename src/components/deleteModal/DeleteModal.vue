<script lang="ts" setup>
import IconDeleteBig from '@/components/icons/IconDeleteBig.vue'
import ButtonBase from '@/shared/ui/button'
import { useModalStore } from '@/stores/modalStore'

const modalStore = useModalStore()
</script>

<template>
  <div class="modal__content modal--small">
    <icon-delete-big class="icon modal__illustration" />
    <h5 class="modal__title">Do you want to delete this artist profile?</h5>
    <p class="modal__text">You will not be able to recover this profile afterwards.</p>
    <button-base :variant="'default'" class="modal__button">delete</button-base>
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
