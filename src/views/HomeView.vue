<script lang="ts" setup>
import IconFilter from '@/components/icons/IconFilter.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import ButtonBase from '@/shared/ui/ButtonBase';
import CardList from '@/shared/ui/CardList';
import TheSearch from '@/shared/ui/TheSearch/TheSearch.vue';
import { useAuthStore } from '@/stores/authStore';
import { useAppStore } from '@/stores/baseStore';
import { useModalStore } from '@/stores/modalStore';

const store = useAppStore();
const authStore = useAuthStore();
</script>
<template>
  <div class="tools-row" v-if="authStore.isUserAuth">
    <button-base variant="underline" @click="useModalStore().openModal('addArtist')">
      <template #icon><icon-plus class="icon" /></template>
      Add artist
    </button-base>
    <div class="tools-row__right-column">
      <the-search />
      <button-base variant="icon" @click="useModalStore().openSidebar('filters')"
        ><icon-filter class="icon"
      /></button-base>
    </div>
  </div>
  <div class="wrapper">
    <card-list :cards="store.artistCards" :is-artists="true" />
    <button-base
      variant="underline"
      v-if="store.isArtistListExpandable && authStore.isUserAuth"
      @click="store.loadMore"
      class="button--load-more"
    >
      Load more
    </button-base>
  </div>
</template>

<style lang="scss" scoped>
.tools-row {
  @include toolsRow;

  .link {
    &__text {
      @include buttonText;
      display: none;

      @media (min-width: $breakpoint-md) {
        display: inline;
      }
    }

    .icon {
      margin-right: 0.75rem;
      rotate: 180deg;
    }
  }
}

.button--load-more {
  display: flex;
  margin: 2rem auto 0;
  @media (min-width: $breakpoint-md) {
    margin: 2.5rem auto 0;
  }
}
</style>
