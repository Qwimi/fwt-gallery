<script lang="ts" setup>
import { useAppStore } from '@/stores/baseStore'
import CardList from '@/shared/ui/cardList/CardList.vue'
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/themeStore'

defineProps<{ theme?: string }>()

const store = useAppStore()
const themeStore = useThemeStore()

onMounted(() => {
  store.getArtists()
})
</script>
<template>
  <div class="wrapper">
    <card-list :cards="store.artistCards" :is-artists="true" :theme="themeStore.theme" />
  </div>
</template>
