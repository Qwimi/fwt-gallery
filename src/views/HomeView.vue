<script lang="ts" setup>
import IconFilter from '@/components/icons/IconFilter.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import SearchFilter from '@/components/SearchFilter';
import ButtonBase from '@/shared/ui/ButtonBase';
import CardList from '@/shared/ui/CardList';
import { useArtistStore } from '@/stores/artistStore';
import { useAuthStore } from '@/stores/authStore';
import { useModalStore } from '@/stores/modalStore';

const store = useArtistStore();
const authStore = useAuthStore();
</script>
<template>
  <div class="tools-row" v-if="authStore.isUserAuth">
    <button-base variant="underline" @click="useModalStore().openModal('addArtist')">
      <template #icon><icon-plus class="icon" /></template>
      Add artist
    </button-base>
    <div class="tools-row__right-column">
      <search-filter class="search" />
      <button-base variant="icon" @click="useModalStore().openSidebar('filters')">
        <icon-filter class="icon" />
      </button-base>
    </div>
  </div>
  <div class="wrapper">
    <template v-if="store.artistCards.length">
      <card-list :cards="store.artistCards" variant="artists" />
      <button-base
        variant="underline"
        v-if="store.isArtistListExpandable && authStore.isUserAuth"
        @click="store.loadMore"
        class="button--load-more"
      >
        Load more
      </button-base>
    </template>

    <template v-else>
      <div class="no-matches">
        <div class="no-matches__title">
          {{ store.getSearchString() ? `No matches for` : 'No matches for filters' }}
          <span class="no-matches__title--bold">{{ store.getSearchString() }}</span>
        </div>
        <div class="no-matches__description">
          {{
            store.getSearchString()
              ? 'Please try again with a different spelling or keywords.'
              : 'Please try again with a different filters.'
          }}
        </div>
      </div>
    </template>
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

.no-matches {
  &__title {
    color: var(--text-secondary);
    margin-bottom: 0.75em;
    @include paragraphBaseLight;
    &--bold {
      @include paragraphBaseMedium;
    }
  }

  &__description {
    color: var(--gray_9c);
    @include paragraphSmallLight;
  }

  @media (min-width: $breakpoint-md) {
    text-align: center;
    font-size: 1.25em;
  }
}

.search {
  display: none;
  @media (min-width: $breakpoint-md) {
    display: block;
  }
}
</style>
