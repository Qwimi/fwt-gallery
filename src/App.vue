<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { RouterView } from 'vue-router';
import TheFooter from '@/components/TheFooter';
import TheHeader from '@/components/TheHeader';

const TheModal = defineAsyncComponent(() => import('@/components/TheModal'));
const TheSidebar = defineAsyncComponent(() => import('@/components/TheSidebar'));
const TheToast = defineAsyncComponent(() => import('@/components/TheToast'));
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
