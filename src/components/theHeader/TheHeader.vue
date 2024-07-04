<script lang="ts" setup>
import IconBurger from '@/components/icons/IconBurger.vue'
import IconLogo from '@/components/icons/IconLogo.vue'
import ThemeToggler from '@/components/ThemeToggler'
import { useAuthStore } from '@/stores/authStore'
import { useModalStore } from '@/stores/modalStore'

const modalStore = useModalStore()
const authStore = useAuthStore()
</script>

<template>
  <header class="header">
    <div class="wrapper">
      <div class="header__content">
        <router-link :to="{ name: 'home' }" class="link-icon">
          <icon-logo class="icon icon-logo" />
        </router-link>
        <div class="icon-burger">
          <icon-burger @click="modalStore.openSidebar('headerSidebar')" class="icon" />
        </div>
        <div class="header__menu">
          <nav class="menu">
            <template v-if="authStore.isUserAuth">
              <li class="menu__item" @click="authStore.logout">Log Out</li>
            </template>
            <template v-else>
              <li class="menu__item" @click="modalStore.openModal('logIn')">Log In</li>
              <li class="menu__item" @click="modalStore.openModal('signUp')">Sign up</li>
            </template>
          </nav>
          <theme-toggler :show-text="false" />
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  color: var(--text-secondary);
  background-color: var(--background-primary);
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;
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
  &__menu {
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
}
</style>
