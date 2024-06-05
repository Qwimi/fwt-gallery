<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/header/TheHeader.vue'
import TheFooter from '@/components/footer/TheFooter.vue'
import { useThemeStore } from './stores/themeStore'
import { onMounted } from 'vue'

onMounted(() => useThemeStore().getTheme())
</script>

<template>
  <the-header />
  <main>
    <router-view />
  </main>
  <the-footer />
</template>
