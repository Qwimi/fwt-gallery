<script lang="ts" setup>
import { useThemeStore } from '@/stores/themeStore'
import { ref, watch, type Ref, defineProps, onMounted } from 'vue'
import IconDark from '@/components/icons/IconDark.vue'
import IconLight from '@/components/icons/IconLight.vue'

const themeStore = useThemeStore()
const isThemeLight: Ref<boolean> = ref(themeStore.isThemeLight)

defineProps({
  showText: Boolean
})

const toggleTheme = () => themeStore.toggleTheme()

onMounted(() => themeStore.getTheme())

watch(
  () => themeStore.isThemeLight,
  () => {
    isThemeLight.value = themeStore.isThemeLight
  }
)
</script>

<template>
  <button class="button button-theme" @click="toggleTheme">
    <span class="button_icon">
      <icon-dark class="icon" v-if="isThemeLight" />
      <icon-light class="icon" v-else />
    </span>
    <span class="button_text" v-if="showText">
      <template v-if="isThemeLight"> Dark mode</template>
      <template v-else> Light mode</template>
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
