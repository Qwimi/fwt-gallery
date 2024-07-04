<script lang="ts" setup>
import IconClose from '@/components/icons/IconClose.vue'
import LoginModal from '@/components/LoginModal'
import SignUpModal from '@/components/SignupModal'
import { useModalStore } from '@/stores/modalStore'

const modalStore = useModalStore()

const currentModalContent = {
  logIn: LoginModal,
  signUp: SignUpModal
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="modal--shadow" v-show="modalStore.isModalOpen" @click="modalStore.closeModal">
        <div class="modal" @click.stop>
          <icon-close class="icon modal__icon-close" @click="modalStore.closeModal" />
          <transition name="component-fade" mode="out-in">
            <KeepAlive>
              <component
                :is="
                  currentModalContent[modalStore.currentModal as keyof typeof currentModalContent]
                "
              />
            </KeepAlive>
          </transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal {
  @include modalMixin;
  @media screen and (min-width: $breakpoint-lg) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
