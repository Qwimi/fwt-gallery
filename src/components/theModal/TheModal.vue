<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue';
import IconClose from '@/components/icons/IconClose.vue';
import { useModalStore } from '@/stores/modalStore';

const modalStore = useModalStore();

const components = {
  logIn: defineAsyncComponent(() => import('@/components/LoginModal')),
  signUp: defineAsyncComponent(() => import('@/components/SignupModal')),
  delete: defineAsyncComponent(() => import('@/components/DeleteModal')),
  addArtist: defineAsyncComponent(() => import('@/components/ArtistInteraction')),
  addPicture: defineAsyncComponent(() => import('@/components/PaintingInteraction'))
};

const currentModal = computed(() => components[modalStore.currentModal as keyof typeof components]);
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="modal--shadow" v-show="modalStore.currentModal" @click="modalStore.closeModal">
        <div class="modal" @click.stop>
          <transition name="component-fade" mode="out-in">
            <component :is="currentModal" @click.stop />
          </transition>
          <button class="modal__close-button" @click="modalStore.closeModal">
            <icon-close class="icon" />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal {
  @include modalMixin;

  &--shadow {
    justify-content: center;
    align-items: center;
  }

  &--shadow:has(&--small) {
    align-items: flex-end;
    @media screen and (min-width: $breakpoint-md) {
      align-items: center;
    }
  }

  &--small + &__close-button {
    display: none;
    @media screen and (min-width: $breakpoint-md) {
      display: block;
    }
  }

  &:has(&--small) {
    height: fit-content;
    width: 100%;

    @media screen and (min-width: $breakpoint-md) {
      max-width: 320px;
    }
  }

  @media screen and (min-width: $breakpoint-lg) {
    height: fit-content;
  }
}

.fade,
.component-fade {
  @include fade(0.5s);
}
</style>
