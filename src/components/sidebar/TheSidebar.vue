<script lang="ts" setup>
import { useModalStore } from '@/stores/modalStore'
import HeaderSidebar from '@/components/sidebar/HeaderSidebar.vue'
import IconClose from '@/components/icons/IconClose.vue'

const modalStore = useModalStore()

const currentSidebarContent = {
  headerSidebar: HeaderSidebar
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="modal--shadow" v-show="modalStore.isSidebarOpen" @click="modalStore.closeSidebar">
        <Transition name="slide">
          <div class="modal modal--sidebar" v-if="modalStore.isSidebarOpen" @click.stop>
            <icon-close class="icon modal_icon-close" @click="modalStore.closeSidebar" />
            <component
              :is="
                currentSidebarContent[
                  modalStore.currentSidebar as keyof typeof currentSidebarContent
                ]
              "
              v-if="modalStore.currentSidebar"
            />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal--sidebar {
  top: 0;
  right: 0;
  height: 100%;
  height: 100vh;
  width: 80%;
  z-index: 3;
  @media screen and (min-width: $breakpoint-md) {
    width: 60%;
  }
}

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

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
