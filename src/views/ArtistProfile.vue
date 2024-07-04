<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'

import ArtistSection from '@/components/ArtistSection'
import router from '@/router'
import CardList from '@/shared/ui/CardList'
import { useAppStore } from '@/stores/baseStore'

const store = useAppStore()
const artistId = router.currentRoute.value.params.id as String

onMounted(() => store.getCurrentArtist(artistId))
onUnmounted(() => store.unmountCurrentArtist())
</script>

<template>
  <artist-section :artist="store.currentArtist" />
  <section class="wrapper">
    <h3 class="section__title">Artworks</h3>
    <card-list :cards="store.currentArtistCards" :is-artists="false" />
  </section>
</template>

<style lang="scss" scoped>
.section__title {
  @include headingH3;
  margin-bottom: 3.75rem;
  color: var(--accent);

  @media screen and (min-width: $breakpoint-md) {
    @include headingH1;
  }

  @media screen and (min-width: $breakpoint-lg) {
    margin-left: 5rem;
  }
}
</style>
