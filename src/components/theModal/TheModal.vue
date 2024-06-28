<script lang="ts" setup>
import ArtistInteractionModal from '@/components/artistInteractionModal'
import DeleteModal from '@/components/deleteModal'
import IconClose from '@/components/icons/IconClose.vue'
import LoginModal from '@/components/loginModal'
import SignUpModal from '@/components/signupModal'
import { useModalStore } from '@/stores/modalStore'

const modalStore = useModalStore()

const currentModalContent = {
  logIn: LoginModal,
  signUp: SignUpModal,
  delete: DeleteModal,
  addArtist: ArtistInteractionModal
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="modal--shadow" v-show="modalStore.isModalOpen" @click="modalStore.closeModal">
        <div class="modal" @click.stop>
          <transition name="component-fade" mode="out-in">
            <KeepAlive>
              <component
                :is="
                  currentModalContent[modalStore.currentModal as keyof typeof currentModalContent]
                "
                @click.stop
              />
            </KeepAlive>
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

    @media screen and (min-width: $breakpoint-md) {
      max-width: 320px;
    }
  }

  @media screen and (min-width: $breakpoint-lg) {
    height: fit-content;
  }
}

.fade-enter-active,
.fade-leave-active,
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to,
.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}
</style>
