<script lang="ts" setup>
import { onMounted } from 'vue';
import CardList from '@/shared/ui/CardList';
import { useAppStore } from '@/stores/baseStore';

const store = useAppStore();
onMounted(() => {
  store.getArtists();
});
</script>
<template>
  <div class="wrapper">
    <card-list :cards="store.artistCards" :is-artists="true" />
  </div>
</template>
