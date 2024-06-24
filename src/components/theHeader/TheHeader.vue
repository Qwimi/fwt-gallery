<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { TheSidebar, HeaderSidebar } from '@/components/sidebar'
import ThemeToggler from '@/components/themeToggler'
import IconLogo from '@/components/icons/IconLogo.vue'
import IconBurger from '@/components/icons/IconBurger.vue'

const isMenuShow: Ref<boolean> = ref(false)

const toggleMenu = () => {
  isMenuShow.value = !isMenuShow.value
}
</script>

<template>
  <header class="header">
    <div class="wrapper">
      <div class="header__content">
        <router-link to="/" class="link-icon">
          <icon-logo class="icon icon-logo" />
        </router-link>
        <div class="icon-burger">
          <icon-burger @click="toggleMenu" class="icon" />
        </div>
        <div class="header__menu">
          <nav class="menu">
            <li class="menu__item">Log In</li>
            <li class="menu__item">Sign up</li>
          </nav>
          <theme-toggler />
        </div>
      </div>
    </div>
    <the-sidebar :is-menu-show="isMenuShow" @toggle-menu="toggleMenu">
      <header-sidebar />
    </the-sidebar>
  </header>
</template>

<style lang="scss" scoped>
.header {
  color: var(--primary-text-dafault);

  &__content {
    display: flex;
    flex-direction: row;
    align-self: center;
    justify-content: space-between;
    padding: 1.25rem 0;
  }

  &__menu {
    display: flex;
    align-items: center;
  }

  .icon-burger {
    @media screen and (min-width: $breakpoint-lg) {
      display: none;
    }
  }

  .icon-logo {
    height: 1rem;
    width: fit-content;

    @media screen and (min-width: $breakpoint-lg) {
      height: 1.25rem;
    }
  }
}

.header__menu {
  flex-direction: row;
  gap: 3.25rem;
  display: none;

  @media screen and (min-width: $breakpoint-lg) {
    display: flex;
  }

  .menu {
    &__item {
      @include headingH5;
    }
  }
}
</style>
