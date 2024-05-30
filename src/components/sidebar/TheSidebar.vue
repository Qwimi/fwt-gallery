<script lang="ts" setup>
import IconClose from '@/components/icons/IconClose.vue'

defineProps({
  isMenuShow: Boolean
})
defineEmits(['toggleMenu'])
</script>

<template>
  <Teleport to="body">
    <div class="modal-shadow" v-show="isMenuShow" @click="$emit('toggleMenu')">
      <Transition name="slide-left">
        <aside class="sidebar" v-show="isMenuShow" @click.stop>
          <icon-close class="icon icon-close" @click="$emit('toggleMenu')" />
          <slot></slot>
        </aside>
      </Transition>
    </div>
  </Teleport>
</template>
<style lang="scss" scoped>
.sidebar {
  position: fixed;
  background-color: var(--background);
  right: 0;
  z-index: 5;
  height: 100vh;
  width: 80%;
  @media screen and (min-width: $breakpoint-md) {
    width: 60%;
  }
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s;
}

.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-left-leave-to {
  transform: translateX(0%);
}

.icon-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
}
</style>
