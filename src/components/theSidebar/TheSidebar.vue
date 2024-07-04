<script lang="ts" setup>
import HeaderSidebar from '@/components/HeaderSidebar'
import IconClose from '@/components/icons/IconClose.vue'
import { useModalStore } from '@/stores/modalStore'
const modalStore = useModalStore()

const currentSidebarContent = {
  headerSidebar: HeaderSidebar
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        class="sidebar--shadow"
        v-show="modalStore.isSidebarOpen"
        @click="modalStore.closeSidebar"
      >
        <Transition name="slide">
          <div class="sidebar" v-if="modalStore.isSidebarOpen" @click.stop>
            <icon-close class="icon sidebar__icon-close" @click="modalStore.closeSidebar" />
            <KeepAlive>
              <component
                :is="
                  currentSidebarContent[
                    modalStore.currentSidebar as keyof typeof currentSidebarContent
                  ]
                "
                v-if="modalStore.currentSidebar"
              />
            </KeepAlive>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.sidebar {
  @include modalMixin;
  right: 0;
  height: 100vh;
  width: 80%;
  @media screen and (min-width: $breakpoint-md) {
    width: 60%;
  }
}

.fade-enter-active,
.fade-leave-active {
  &.sidebar--shadow {
    transition: opacity 0.5s ease-in-out;
  }
}

.fade-enter-from,
.fade-leave-to {
  &.sidebar--shadow {
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
