<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/header/TheHeader.vue'
import TheFooter from '@/components/footer/TheFooter.vue'
import { useThemeStore } from './stores/themeStore'
import { onMounted } from 'vue'
import { useModalStore } from './stores/modalStore'
import TheModal from '@/components/modal/TheModal.vue'
import TheSidebar from '@/components/sidebar/TheSidebar.vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.getTheme()
  useModalStore()
})
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
