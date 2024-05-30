<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/header/TheHeader.vue'
import TheFooter from '@/components/footer/TheFooter.vue'
import { useThemeStore } from './stores/themeStore'
import { onMounted } from 'vue'
import { useModalStore } from './stores/modalStore'
import TheModal from '@/components/modal/TheModal.vue'
import TheSidebar from '@/components/sidebar/TheSidebar.vue'

onMounted(() => {
  useThemeStore().getTheme()
  useModalStore()
})
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
