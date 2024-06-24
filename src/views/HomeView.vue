<script lang="ts" setup>
import { onMounted } from 'vue'
import { useAppStore } from '@/stores/artStore'
import CardList from '@/shared/ui/cardList'

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
