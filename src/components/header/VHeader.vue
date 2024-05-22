<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import IconLogo from '@/components/icons/IconLogo.vue'
import IconBurger from '@/components/icons/IconBurger.vue'
import ButtonTheme from '@/components/button/ButtonTheme.vue'
import VSidebar from '@/components/sidebar/VSidebar.vue'
import HeaderSidebar from '@/components/sidebar/HeaderSidebar.vue'

const isMenuShow: Ref<boolean> = ref(false)

const toggleMenu = () => {
  isMenuShow.value = !isMenuShow.value
}
</script>

<template>
  <header class="header">
    <div class="wrapper">
      <div class="header_content">
        <router-link to="/">
          <icon-logo class="icon icon-logo" />
        </router-link>
        <div class="icon-burger">
          <icon-burger @click="toggleMenu" class="icon" />
        </div>
        <div class="header_menu">
          <nav class="menu">
            <li class="menu_item">Log In</li>
            <li class="menu_item">Sign up</li>
          </nav>
          <button-theme />
        </div>
      </div>
    </div>
    <v-sidebar :is-menu-show="isMenuShow" @toggle-menu="toggleMenu">
      <header-sidebar />
    </v-sidebar>
  </header>
</template>

<style lang="scss" scoped>
.header {
  color: var(--primary-text-dafault);
  &_content {
    display: flex;
    flex-direction: row;
    align-self: center;
    justify-content: space-between;
    padding: 1.25rem 0;
  }
  &_menu {
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

.header_menu {
  flex-direction: row;
  gap: 3.25rem;
  display: none;
  @media screen and (min-width: $breakpoint-lg) {
    display: flex;
  }
  .menu {
    &_item {
      @include headingH5;
    }
  }
}
</style>
