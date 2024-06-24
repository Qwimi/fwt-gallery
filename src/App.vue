<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useThemeStore } from './stores/themeStore'
import TheHeader from './components/theHeader'
import TheFooter from '@/components/theFooter'

onMounted(() => useThemeStore().getTheme())
</script>

<template>
  <the-header />
  <main>
    <router-view />
  </main>
  <the-footer />
</template>
