<script lang="ts" setup>
import { defineProps } from 'vue'
import IconClose from '@/components/icons/IconClose.vue'

defineProps({
  isMenuShow: Boolean
})
defineEmits(['toggleMenu'])
</script>

<template>
  <div class="modal-shadow" v-show="isMenuShow" @click="$emit('toggleMenu')">
    <Transition name="slide-left">
      <aside class="sidebar" v-show="isMenuShow" @click.stop>
        <icon-close class="icon icon-close" @click="$emit('toggleMenu')" />
        <slot></slot>
      </aside>
    </Transition>
  </div>
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
  @media screen and (min-width: $breakpoint-lg) {
    display: none;
  }
}

.slide-left-leave-active,
.slide-left-enter-active {
  transition: 0.3s;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translate(100%, 0);
}

.icon-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
}
</style>
