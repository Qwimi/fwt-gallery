<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheFooter from '@/components/TheFooter';
import TheHeader from '@/components/TheHeader';
import TheModal from '@/components/TheModal';
import TheSidebar from '@/components/TheSidebar';
import TheToast from '@/components/TheToast';
import SpinnerLoader from '@/shared/ui/SpinnerLoader';
</script>

<template>
  <!-- <spinner-loader /> -->
  <the-sidebar />
  <the-modal />
  <the-header />
  <the-toast />
  <main>
    <router-view />
  </main>
  <the-footer />
</template>
