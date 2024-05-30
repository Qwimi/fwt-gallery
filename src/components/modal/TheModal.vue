<script lang="ts" setup>
import { useModalStore } from '@/stores/modalStore'
import LogInModal from '@/components/modal/LogInModal.vue'
import SignUpModal from '@/components/modal/SignUpModal.vue'

const modalStore = useModalStore()

const currentModalContent = {
  logIn: LogInModal,
  signUp: SignUpModal
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="modal--shadow" v-show="modalStore.isModalOpen" @click="modalStore.closeModal">
        <transition name="component-fade" mode="out-in">
          <component
            :is="currentModalContent[modalStore.currentModal as keyof typeof currentModalContent]"
            v-if="modalStore.currentModal"
          />
        </transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  &.modal--shadow {
    transition: opacity 0.5s ease-in-out;
  }
}

.fade-enter-from,
.fade-leave-to {
  &.modal--shadow {
    opacity: 0;
  }
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: translateX 0.5s;
}

.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-left-leave-to {
  transform: translateX(0%);
}
</style>
