<script setup lang="ts">
import { RouterView } from 'vue-router'
import VHeader from '@/components/header/VHeader.vue'
import VFooter from '@/components/footer/VFooter.vue'
import { onMounted } from 'vue'
import { useAppStore } from './stores/artStore'
import { useThemeStore } from './stores/themeStore'

onMounted(() => {
  useAppStore().getArtists()
  useThemeStore().getTheme()
})
</script>

<template>
  <v-header />
  <router-view />
  <v-footer />
</template>
