<script lang="ts" setup>
import IconDark from '@/components/icons/IconDark.vue'
import IconLight from '@/components/icons/IconLight.vue'
import { useThemeStore } from '@/stores/themeStore'

const themeStore = useThemeStore()

defineProps<{
  showText: Boolean
}>()
</script>

<template>
  <button class="button button--theme" @click="themeStore.toggleTheme">
    <icon-dark class="icon button__icon" v-if="themeStore.theme === 'light'" />
    <icon-light class="icon button__icon" v-else />
    <span class="button__text" v-if="showText">
      <template v-if="themeStore.theme === 'light'"> Dark mode</template>
      <template v-else> Light mode</template>
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button--theme {
  @include buttonMixin;
  .button__icon {
    padding: 0.5rem;
    border-radius: 100%;
    background-color: var(--background-secondary);
    height: 2.5rem;
    width: 2.5rem;
  }

  .button__text {
    @include buttonText;
    border-bottom: 1px solid;
  }
}
</style>
