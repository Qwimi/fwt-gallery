<script lang="ts" setup>
import { computed } from 'vue';
import ArtistInteraction from '@/components/ArtistInteraction';
import DeleteModal from '@/components/DeleteModal';
import IconClose from '@/components/icons/IconClose.vue';
import LoginModal from '@/components/LoginModal';
import SignUpModal from '@/components/SignupModal';
import { useModalStore } from '@/stores/modalStore';

const modalStore = useModalStore();

const components = {
  logIn: LoginModal,
  signUp: SignUpModal,
  delete: DeleteModal,
  addArtist: ArtistInteraction
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
          <icon-close class="icon modal__icon-close" @click="modalStore.closeModal" />
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

  &--small + &__icon-close {
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
