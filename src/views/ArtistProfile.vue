<script lang="ts" setup>
import router from '@/router'
import { useAppStore } from '@/stores/artStore'
import { onMounted, onUnmounted } from 'vue'
import CardList from '@/shared/ui/cardList/CardList.vue'
import ArtistSection from '@/components/artistSection/ArtistSection.vue'

defineProps<{ theme?: string }>()

const store = useAppStore()
const artistId = router.currentRoute.value.params.id as String

onMounted(() => store.getCurrentArtist(artistId))
onUnmounted(() => store.unmountCurrentArtist())
</script>

<template>
  <artist-section :artist="store.currentArtist" :theme="theme" />
  <section class="wrapper">
    <h3 class="section__title" :class="`section__title--${theme}`">Artworks</h3>
    <card-list :cards="store.currentArtistCards" :is-artists="false" :theme="theme" />
  </section>
</template>

<style lang="scss" scoped>
.section__title {
  @include headingH3;
  margin-bottom: 3.75rem;
  color: var(--accent-red);

  @media screen and (min-width: $breakpoint-md) {
    @include headingH1;
  }

  @media screen and (min-width: $breakpoint-lg) {
    margin-left: 5rem;
  }

  &--dark {
    color: var(--accent-gold);
  }
}
</style>
