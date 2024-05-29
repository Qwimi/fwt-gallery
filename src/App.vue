<script setup lang="ts">
import { RouterView } from 'vue-router'
import VHeader from '@/components/header/VHeader.vue'
import VFooter from '@/components/footer/VFooter.vue'
</script>

<template>
  <v-header />
  <main>
    <router-view />
  </main>
  <v-footer />
</template>
