<script lang="ts" setup>
import ThemeToggler from '@/components/header/ThemeToggler.vue'
</script>

<template>
  <div class="header_sidebar">
    <theme-toggler :show-text="true" />
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
