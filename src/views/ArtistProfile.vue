<script lang="ts" setup>
import router from '@/router'
import { useAppStore } from '@/stores/artStore'
import { onMounted, onUnmounted } from 'vue'
import CardList from '@/components/cardList/CardList.vue'
import ArtistSection from '@/components/artistSection/ArtistSection.vue'

const store = useAppStore()
const artistId: String = router.currentRoute.value.params.id as String

onMounted(() => store.getCurrentArtist(artistId))
onUnmounted(() => store.unmountCurrentArtist())
</script>

<template>
  <artist-section :artist="store.currentArtist" />
  <section class="wrapper">
    <h3 class="section_title">Artworks</h3>
    <card-list :cards="store.currentArtistCards" :is-artists="false" />
  </section>
</template>

<style lang="scss" scoped>
.section_title {
  @include headingH3;
  color: var(--accent);
  margin-bottom: 3.75rem;
  @media screen and (min-width: $breakpoint-md) {
    @include headingH1;
  }

  @media screen and (min-width: $breakpoint-lg) {
    margin-left: 5rem;
  }
}
</style>
