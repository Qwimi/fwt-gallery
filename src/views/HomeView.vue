<script lang="ts" setup>
import { useAppStore } from '@/stores/artStore'
import { onMounted, ref, watch, type Ref } from 'vue'
import CardList from '@/components/cardList/CardList.vue'
import type { CardInterface } from '@/stores/types'

const store = useAppStore()
const artists: Ref<Array<CardInterface>> = ref(store.artistCards)

onMounted(() => {
  store.getArtists()
})

watch(
  () => store.artists,
  () => {
    artists.value = store.artistCards
  }
)
</script>
<template>
  <main>
    <div class="wrapper">
      <card-list :cards="artists" :is-artists="true" />
    </div>
  </main>
</template>
