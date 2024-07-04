<script setup lang="ts">
import { RouterView } from 'vue-router'

import { useAuthStore } from './stores/authStore'
import { useModalStore } from './stores/modalStore'
import { useThemeStore } from './stores/themeStore'

import TheFooter from '@/components/TheFooter'
import TheHeader from '@/components/TheHeader'
import TheModal from '@/components/TheModal'
import TheSidebar from '@/components/TheSidebar'

useThemeStore()
useAuthStore()
useModalStore()
</script>

<template>
  <the-sidebar />
  <the-modal />
  <the-header />
  <main>
    <router-view />
  </main>
  <the-footer />
</template>
