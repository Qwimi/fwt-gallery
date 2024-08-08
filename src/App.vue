<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineAsyncComponent, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useArtistStore } from './stores/artistStore';
import TheFooter from '@/components/TheFooter';
import TheHeader from '@/components/TheHeader';
import SpinnerLoader from '@/shared/ui/SpinnerLoader';

const TheModal = defineAsyncComponent(() => import('@/components/TheModal'));
const TheSidebar = defineAsyncComponent(() => import('@/components/TheSidebar'));
const TheToast = defineAsyncComponent(() => import('@/components/TheToast'));

const store = useArtistStore();
const { isPageLoading } = storeToRefs(store);

onMounted(() => store.getArtists());
</script>

<template>
  <spinner-loader v-if="isPageLoading" />
  <the-sidebar />
  <the-modal />
  <the-header />
  <the-toast />
  <main>
    <router-view />
  </main>
  <the-footer />
</template>
