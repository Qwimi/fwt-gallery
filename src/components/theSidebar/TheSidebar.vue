<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue';
import IconClose from '@/components/icons/IconClose.vue';
import { useModalStore } from '@/stores/modalStore';

const modalStore = useModalStore();

const components = {
  headerSidebar: defineAsyncComponent(() => import('@/components/HeaderSidebar')),
  filters: defineAsyncComponent(() => import('@/components/FiltersSidebar'))
};

const currentSidebar = computed(
  () => components[modalStore.currentSidebar as keyof typeof components]
);
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        class="sidebar--shadow"
        v-show="modalStore.currentSidebar"
        @click="modalStore.closeSidebar"
      >
        <Transition name="slide">
          <div class="sidebar" v-show="modalStore.currentSidebar" @click.stop>
            <KeepAlive>
              <component :is="currentSidebar" />
            </KeepAlive>
            <button class="sidebar__close-button" @click="modalStore.closeSidebar">
              <icon-close class="icon" />
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.sidebar {
  @include modalMixin;
  width: 80%;
  @media (min-width: $breakpoint-md) {
    width: 50%;
  }

  @media (min-width: $breakpoint-lg) {
    width: 33.33%;
  }

  &--shadow {
    justify-content: flex-end;
  }
}

.fade {
  @include fade(0.5s);
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
