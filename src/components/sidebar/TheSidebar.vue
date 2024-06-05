<script lang="ts" setup>
import IconClose from '@/components/icons/IconClose.vue'

defineProps({
  isMenuShow: Boolean
})
defineEmits(['toggleMenu'])
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="modal--shadow" v-show="isMenuShow" @click="$emit('toggleMenu')">
        <Transition name="slide">
          <aside class="sidebar" v-show="isMenuShow" @click.stop>
            <icon-close class="icon icon-close" @click="$emit('toggleMenu')" />
            <slot></slot>
          </aside>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal--shadow {
  @include modalMixin;
}
.sidebar {
  position: fixed;
  background-color: var(--background);
  right: 0;
  z-index: 5;
  height: 100vh;
  width: 80%;
  color: var(--primary-text-dafault);
  @media screen and (min-width: $breakpoint-md) {
    width: 60%;
  }
}

.icon-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
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
