<script setup lang="ts">
import { RouterView } from 'vue-router'

import { useAuthStore } from './stores/authStore'
import { useModalStore } from './stores/modalStore'
import { useThemeStore } from './stores/themeStore'

import TheFooter from '@/components/theFooter'
import TheHeader from '@/components/theHeader'
import TheModal from '@/components/theModal'
import TheSidebar from '@/components/theSidebar'

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
