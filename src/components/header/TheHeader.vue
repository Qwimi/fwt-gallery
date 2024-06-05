<script lang="ts" setup>
import IconLogo from '@/components/icons/IconLogo.vue'
import IconBurger from '@/components/icons/IconBurger.vue'
import ThemeToggler from '@/components/header/ThemeToggler.vue'
import { useModalStore } from '@/stores/modalStore'
defineProps<{ theme: string }>()
const modalStore = useModalStore()
</script>

<template>
  <header class="header" :class="`header--${theme}`">
    <div class="wrapper">
      <div class="header__content">
        <router-link to="/" class="link-icon">
          <icon-logo class="icon icon-logo" />
        </router-link>
        <div class="icon-burger">
          <icon-burger @click="modalStore.openSidebar('headerSidebar')" class="icon" />
        </div>
        <div class="header__menu">
          <nav class="menu" :class="`menu--${theme}`">
            <li class="menu__item" @click="modalStore.openModal('logIn')">Log In</li>
            <li class="menu__item" @click="modalStore.openModal('signUp')">Sign up</li>
          </nav>
          <theme-toggler :show-text="false" />
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  color: var(--primary-gray-dark);
  &__content {
    display: flex;
    flex-direction: row;
    align-self: center;
    justify-content: space-between;
    padding: 1.25rem 0;
  }
  &__menu {
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
  &--dark {
    color: var(--primary-gray-light);
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
