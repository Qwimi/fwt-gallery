<script lang="ts" setup>
import ThemeToggler from '@/components/header/ThemeToggler.vue'
import { useModalStore } from '@/stores/modalStore'

defineProps<{ theme: string }>()

const modalStore = useModalStore()
</script>

<template>
  <div class="sidebar__content">
    <theme-toggler :show-text="true" />
    <nav class="menu" :class="`menu--${theme}`">
      <li class="menu__item" @click="modalStore.openModal('logIn')">Log In</li>
      <li class="menu__item" @click="modalStore.openModal('signUp')">Sign up</li>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.sidebar__content {
  padding: 9rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  .menu {
    flex-direction: column;
    gap: 2rem;
    &__item {
      @include headingH3;
    }
  }

  @media screen and (min-width: $breakpoint-md) {
    padding: 12.5rem 6rem;
    gap: 3.25rem;
    .menu {
      gap: 2.5rem;
      &__item {
        @include headingH1;
      }
    }
  }
}
</style>
