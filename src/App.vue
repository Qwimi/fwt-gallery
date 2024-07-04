<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

import { useAuthStore } from './stores/authStore'
import { useAppStore } from './stores/baseStore'
import { useModalStore } from './stores/modalStore'
import { useThemeStore } from './stores/themeStore'

import TheFooter from '@/components/theFooter'
import TheHeader from '@/components/theHeader'
import TheModal from '@/components/theModal'
import TheSidebar from '@/components/theSidebar'
import TheToast from '@/shared/ui/TheToast'

useThemeStore()
useModalStore()
useAuthStore()
useAppStore()
onMounted(() => useAuthStore().getLocalTokens())
</script>

<template>
  <the-sidebar />
  <the-modal />
  <the-header />
  <the-toast />
  <main>
    <router-view />
  </main>
  <the-footer />
</template>
