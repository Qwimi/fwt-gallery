<script lang="ts" setup>
import { useThemeStore } from '@/stores/themeStore'
import IconDark from '@/components/icons/IconDark.vue'
import IconLight from '@/components/icons/IconLight.vue'

const themeStore = useThemeStore()

defineProps({
  showText: Boolean
})
</script>

<template>
  <button class="button button--theme" @click="themeStore.toggleTheme">
    <span class="button__icon">
      <icon-dark class="icon" v-if="themeStore.isThemeLight" />
      <icon-light class="icon" v-else />
    </span>
    <span class="button__text" v-if="showText">
      <template v-if="themeStore.isThemeLight"> Dark mode</template>
      <template v-else> Light mode</template>
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button--theme {
  .button__icon {
    padding: 0.5rem;
    border-radius: 100%;
    background-color: var(--background-secondary);
    aspect-ratio: 1/1;
  }

  .button__text {
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
    .button__text::after {
      color: var(--primary-text-hover);
    }
  }
}
</style>
