<script lang="ts" setup>
import { useAppStore } from '@/stores/artStore'
import CardList from '@/components/cardList/CardList.vue'
import { onMounted } from 'vue'

const store = useAppStore()

onMounted(() => {
  store.getArtists()
})
</script>
<template>
  <div class="wrapper">
    <card-list :cards="store.artistCards" :is-artists="true" />
  </div>
</template>
