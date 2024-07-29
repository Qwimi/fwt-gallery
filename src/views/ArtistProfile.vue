<script lang="ts" setup>
import { onUnmounted, ref, type Ref } from 'vue';
import ArtistSection from '@/components/ArtistSection';
import IconArrowDecoration from '@/components/icons/IconArrowDecoration.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import PaintingSlider from '@/components/PaintingSlider';
import router from '@/router';
import AddMainPicture from '@/shared/ui/AddMainPicture';
import ButtonBase from '@/shared/ui/ButtonBase';
import CardList from '@/shared/ui/CardList';
import ThePagination from '@/shared/ui/ThePagination';
import { useArtistStore } from '@/stores/artistStore';
import { useAuthStore } from '@/stores/authStore';
import { useModalStore } from '@/stores/modalStore';
import { usePaintingStore } from '@/stores/paintingStore';
import type { CardInterface } from '@/stores/types';

const store = useArtistStore();
const paintingStore = usePaintingStore();
const authStore = useAuthStore();
const modalStore = useModalStore();
const artistId = router.currentRoute.value.params.id as string;
store.getCurrentArtist(artistId);

const isSliderOpen: Ref<boolean> = ref(false);
const slideToOpen: Ref<string | null> = ref(null);

const openSlider = (id: string) => {
  isSliderOpen.value = true;
  slideToOpen.value = id;
};

const openDeletePaintingModal = (cardId: string) => {
  modalStore.openModal('delete', { id: cardId, target: paintingStore.deletePicture });
};
const openEditPaintingModal = (card: CardInterface) => {
  modalStore.openModal('addPicture', { ...card, target: paintingStore.updatePainting });
};
const setMainPainting = (cardId: string) => {
  paintingStore.setMainPainting(cardId);
};

onUnmounted(() => store.unmountCurrentArtist());
</script>

<template>
  <div class="tools-row">
    <router-link :to="{ name: 'home' }" class="link">
      <icon-arrow-decoration class="icon" />
      <span class="link__text">back</span>
    </router-link>
    <div class="tools-row__right-column" v-if="authStore.isUserAuth">
      <button-base variant="icon" @click="modalStore.openModal('addArtist', store.currentArtist)">
        <template #icon>
          <icon-edit class="icon" />
        </template>
      </button-base>
      <button-base
        variant="icon"
        @click="
          modalStore.openModal('delete', {
            target: store.deleteArtist
          })
        "
      >
        <template #icon>
          <icon-delete class="icon" />
        </template>
      </button-base>
    </div>
  </div>

  <painting-slider
    v-if="isSliderOpen && store.currentArtistCards?.length"
    :slides="store.currentArtistCards"
    :main-painting="store.currentArtist?.mainPainting?._id"
    :open-slide="slideToOpen"
    @close="() => (isSliderOpen = false)"
    @edit-pic="openEditPaintingModal($event)"
    @make-the-cover="setMainPainting($event)"
    @delete-pic="openDeletePaintingModal($event)"
  />
  <artist-section :artist="store.currentArtist" v-if="store.currentArtist && !store.isLoading" />
  <section class="wrapper">
    <h3 class="section__title">Artworks</h3>
    <template v-if="store.currentArtistCards?.length">
      <div class="tools-row" v-if="authStore.isUserAuth">
        <div class="tools-row__right-column">
          <button-base
            variant="underline"
            @click="modalStore.openModal('addPicture', { target: paintingStore.createPainting })"
          >
            <template #icon><icon-plus class="icon" /></template>
            Add artist
          </button-base>
        </div>
      </div>

      <card-list
        :cards="store.currentPaginationView"
        :is-loading="store.isLoading"
        variant="paintings"
        @open-slider="openSlider($event)"
        @edit-pic="openEditPaintingModal($event)"
        @make-the-cover="setMainPainting($event)"
        @delete-pic="openDeletePaintingModal($event)"
      />

      <the-pagination
        v-if="store.paginationPagesCount > 1"
        v-model="store.currentPaginationPage"
        :pages-count="store.paginationPagesCount"
        class="pagination"
      />
    </template>
    <div class="no-cards" v-else-if="!store.isLoading">
      <add-main-picture
        @click="modalStore.openModal('addPicture', { target: paintingStore.createMainPainting })"
        v-if="authStore.isUserAuth && store.currentArtist"
      />
      <span class="no-cards__decoration"></span>
      <p class="no-cards__title">The paintings of this artist have not been uploaded yet.</p>
    </div>
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

.pagination {
  margin: 2rem auto 0;
  @media (min-width: $breakpoint-md) {
    margin: 2.5rem auto 0;
  }
}

.no-cards {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
  text-align: center;
  &__title {
    color: var(--text-secondary);
    @include headingH4;
  }
  &__decoration {
    height: 2px;
    width: 160px;
    background-color: var(--accent);
  }
}
</style>
