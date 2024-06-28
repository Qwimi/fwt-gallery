<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'

import ArtistSection from '@/components/artistSection'
import IconArrowDecoration from '@/components/icons/IconArrowDecoration.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import router from '@/router'
import ButtonBase from '@/shared/ui/button'
import CardList from '@/shared/ui/cardList'
import { useAuthStore } from '@/stores/authStore'
import { useAppStore } from '@/stores/baseStore'
import { useModalStore } from '@/stores/modalStore'

const store = useAppStore()
const authStore = useAuthStore()
const modalStore = useModalStore()
const artistId = router.currentRoute.value.params.id as String

onMounted(() => store.getCurrentArtist(artistId))
onUnmounted(() => store.unmountCurrentArtist())
</script>

<template>
  <div class="tools-row">
    <div class="wrapper">
      <router-link :to="{ name: 'home' }" class="link">
        <icon-arrow-decoration class="icon" />
        <span class="link__text">back</span>
      </router-link>
      <div class="tools-row__right-column" v-if="authStore.isUserAuth">
        <button-base :variant="'icon'">
          <template #icon>
            <icon-edit class="icon" />
          </template>
        </button-base>
        <button-base :variant="'icon'" @click="modalStore.openModal('delete')">
          <template #icon>
            <icon-delete class="icon" />
          </template>
        </button-base>
      </div>
    </div>
  </div>
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

.tools-row {
  @include toolsRow;

  .link {
    &__text {
      @include buttonText;
      display: none;

      @media screen and (min-width: $breakpoint-md) {
        display: inline;
      }
    }

    .icon {
      margin-right: 0.75rem;
      rotate: 180deg;
    }
  }
}
</style>
