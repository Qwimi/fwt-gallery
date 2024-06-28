<script lang="ts" setup>
import IconClose from '@/components/icons/IconClose.vue'
import IconError from '@/components/icons/IconError.vue'
import { useModalStore } from '@/stores/modalStore'

const modalStore = useModalStore()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="toast" v-if="modalStore.toastMessage">
        <icon-error class="toast__icon" />
        <div class="toast__about">
          <h3 class="toast__title">Error!</h3>
          <p class="toast__text">
            {{ modalStore.toastMessage }}
          </p>
        </div>
        <icon-close class="icon toast__icon-close" @click="modalStore.toastMessage = ''" />
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.toast {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: var(--background-secondary);
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid light-dark(var(--gray_de), transparent);
  color: var(--text-secondary);
  display: flex;
  gap: 0.5rem;
  align-items: center;
  overflow: hidden;

  @media screen and (min-width: $breakpoint-md) {
    padding: 1.25rem;
    align-items: flex-start;
    width: 441px;
    bottom: 1.25rem;
    right: 1.25rem;
  }

  &__about {
    flex: 1;
  }

  &__title {
    @include paragraphBaseMedium;
    color: var(--error);
    display: none;
    margin-bottom: 0.5rem;
    @media screen and (min-width: $breakpoint-md) {
      display: block;
    }
  }

  &__text {
    @include paragraphSmallLight;
  }

  &__icon-close {
    @media screen and (min-width: $breakpoint-md) {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0.5rem;
    background: var(--error);
    display: none;
    @media screen and (min-width: $breakpoint-md) {
      display: block;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
