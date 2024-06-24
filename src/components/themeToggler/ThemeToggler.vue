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
  <button class="button-theme" @click="themeStore.toggleTheme">
    <icon-dark class="icon button_icon" v-if="themeStore.isThemeLight" />
    <icon-light class="icon button_icon" v-else />
    <span class="button_text" v-if="showText">
      <template v-if="themeStore.isThemeLight"> Dark mode</template>
      <template v-else> Light mode</template>
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button-theme {
  @include buttonMixin;
  .button_icon {
    padding: 0.5rem;
    border-radius: 100%;
    background-color: var(--background-secondary);

    height: 2.5rem;
    width: 2.5rem;
  }

  .button_text {
    @include buttonText;
    border-bottom: 1px solid var(--primary-text-dafault);
  }
  &:hover,
  &:focus {
    color: var(--primary-text-hover);
    border-color: var(--primary-text-hover);
  }
}
</style>
