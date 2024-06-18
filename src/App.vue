<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/header/TheHeader.vue'
import TheFooter from '@/components/footer/TheFooter.vue'
import TheModal from '@/components/modal/TheModal.vue'
import TheSidebar from '@/components/sidebar/TheSidebar.vue'
import { useThemeStore } from './stores/themeStore'
import { useModalStore } from './stores/modalStore'
import { useAuthStore } from './stores/authStore'

const themeStore = useThemeStore()
useAuthStore()
useModalStore()
</script>

<template>
  <the-sidebar :theme="themeStore.theme" />
  <the-modal :theme="themeStore.theme" />
  <the-header :theme="themeStore.theme" />
  <main>
    <router-view :theme="themeStore.theme" />
  </main>
  <the-footer :theme="themeStore.theme" />
</template>
