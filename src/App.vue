<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue';
import { RouterView } from 'vue-router';
import { usePageStore } from './stores/pageLoadingStore';
import TheFooter from '@/components/TheFooter';
import TheHeader from '@/components/TheHeader';
import SpinnerLoader from '@/shared/ui/SpinnerLoader';

const TheModal = defineAsyncComponent(() => import('@/components/TheModal'));
const TheSidebar = defineAsyncComponent(() => import('@/components/TheSidebar'));
const TheToast = defineAsyncComponent(() => import('@/components/TheToast'));

const uiStore = usePageStore();
const { isLoading } = storeToRefs(uiStore);
</script>

<template>
  <spinner-loader v-if="isLoading" />
  <the-sidebar />
  <the-modal />
  <the-header />
  <the-toast />
  <main>
    <router-view />
  </main>
  <the-footer />
</template>
