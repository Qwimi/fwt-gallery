<script lang="ts" setup>
import { useThemeStore } from '@/stores/themeStore'
import { ref, watch, type Ref } from 'vue'
import ButtonTheme from '@/components/button/ButtonTheme.vue'

const themeStore = useThemeStore()
const isThemeLight: Ref<boolean> = ref(themeStore.isThemeLight)

watch(
  () => themeStore.isThemeLight,
  () => {
    isThemeLight.value = themeStore.isThemeLight
  }
)
</script>

<template>
  <div class="header_sidebar">
    <button-theme :show-text="true" />
    <nav class="menu">
      <li class="menu_item">Log In</li>
      <li class="menu_item">Sign up</li>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.header_sidebar {
  padding: 9rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  .menu {
    flex-direction: column;
    gap: 2rem;
    &_item {
      @include headingH3;
    }
  }

  @media screen and (min-width: $breakpoint-md) {
    padding: 12.5rem 6rem;
    gap: 3.25rem;
    .menu {
      gap: 2.5rem;
      &_item {
        @include headingH1;
      }
    }
  }
}
</style>
