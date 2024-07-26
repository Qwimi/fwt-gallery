<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import IconBurger from '@/components/icons/IconBurger.vue';
import IconLogo from '@/components/icons/IconLogo.vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import SearchFilter from '@/components/SearchFilter';
import ThemeToggler from '@/components/ThemeToggler';
import router from '@/router';
import { useAuthStore } from '@/stores/authStore';
import { useModalStore } from '@/stores/modalStore';

const modalStore = useModalStore();
const authStore = useAuthStore();

const isSearchOpen: Ref<boolean> = ref(false);
</script>

<template>
  <header class="header">
    <div class="wrapper">
      <div class="header__content">
        <router-link :to="{ name: 'home' }" class="icon--link">
          <icon-logo class="icon icon-logo" />
        </router-link>
        <div class="header__column-right">
          <search-filter
            class="search"
            :is-closable="true"
            v-show="router.currentRoute.value.name == 'home' && isSearchOpen"
            @close="isSearchOpen = false"
          />
          <button class="search-toggler" @click="isSearchOpen = true" v-show="!isSearchOpen">
            <icon-search class="icon" />
          </button>
          <button class="icon-burger" @click="modalStore.openSidebar('headerSidebar')">
            <icon-burger class="icon" />
          </button>
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
  z-index: 2;
  &__content {
    display: flex;
    flex-direction: row;
    align-self: center;
    justify-content: space-between;
    padding: 1.25rem 0;
  }
  &__menu {
    align-items: center;
    gap: 3.25rem;
    display: none;

    @media (min-width: $breakpoint-lg) {
      display: flex;
    }

    .menu {
      &__item {
        @include headingH5;
        white-space: nowrap;
      }
    }
  }

  &__column-right {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 1.25rem;
    width: 100%;
    min-height: 2rem;
  }

  .icon-burger {
    @include buttonMixin;
    @media (min-width: $breakpoint-lg) {
      display: none;
    }
  }
  .icon-logo {
    height: 1rem;
    width: fit-content;

    @media (min-width: $breakpoint-lg) {
      height: 1.25rem;
    }
  }
}

.icon--link {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.search {
  flex: 1;
}

.search-toggler {
  @include buttonMixin;
}

.search,
.search-toggler {
  display: block;
  @media (min-width: $breakpoint-md) {
    display: none;
  }
}
</style>
