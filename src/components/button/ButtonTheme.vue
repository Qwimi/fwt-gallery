<script lang="ts" setup>
import { useThemeStore } from '@/stores/themeStore'
import { ref, watch, type Ref } from 'vue'
import IconDark from '@/components/icons/IconDark.vue'
import IconLight from '@/components/icons/IconLight.vue'

const themeStore = useThemeStore()
const isThemeLight: Ref<boolean> = ref(themeStore.isThemeLight)

const toggleTheme = () => themeStore.toggleTheme()

watch(
  () => themeStore.isThemeLight,
  () => {
    isThemeLight.value = themeStore.isThemeLight
  }
)
</script>

<template>
  <button class="button button-theme" @click="toggleTheme">
    <span class="button_icon icon">
      <icon-dark v-if="isThemeLight" />
      <icon-light v-else />
    </span>
    <span class="button_text" v-if="$slots.text">
      <slot name="text"></slot>
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button-theme {
  color: var(--primary-text-dafault);
  .button_icon {
    padding: 0.5rem;
    border-radius: 100%;
    background-color: var(--background-secondary);
    aspect-ratio: 1/1;
  }

  .button_text {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      height: 1px;
      width: 100%;
      background-color: var(--primary-text-dafault);
    }
  }
  &:hover,
  &:focus {
    color: var(--primary-text-hover);
    .button_text::after {
      color: var(--primary-text-hover);
    }
  }
}
</style>
