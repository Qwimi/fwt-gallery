<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import ButtonBase from '@/shared/ui/ButtonBase';
import FilterItem from '@/shared/ui/FilterItem';
import { useArtistStore } from '@/stores/artistStore';
import { useGenresStore } from '@/stores/genresStore';

const store = useArtistStore();
const genresStore = useGenresStore();
const initialState = {
  genres: [],
  orderBy: ''
};

const form = reactive({ ...initialState });
const formElement = ref<HTMLFormElement | undefined>();

const sortByValues = [
  { _id: 'recently', name: 'Recently added' },
  { _id: 'asc', name: 'A-Z' },
  { _id: 'desc', name: 'Z-A' }
];

const resetForm = () => {
  Object.assign(form, initialState);
  formElement.value?.reset();
};

const sentForm = () => store.filterArtists(form);

onMounted(() => genresStore.getFilterableGenres());
</script>

<template>
  <div class="sidebar__content">
    <form class="filters" @submit.prevent="sentForm" ref="formElement">
      <div class="filters__list">
        <filter-item
          label="Genres"
          :options="genresStore.filterableGenres"
          :is-radio="false"
          v-model="form.genres"
        />
        <filter-item
          label="Sort by"
          :options="sortByValues"
          :is-radio="true"
          v-model="form.orderBy"
        />
      </div>
      <div class="filters__buttons">
        <button-base variant="underline" :type="'submit'"> Show the results </button-base>
        <button-base
          variant="underline"
          :type="'reset'"
          :disabled="!(form.genres.length || form.orderBy)"
          @click="resetForm"
        >
          reset
        </button-base>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.sidebar__content {
  padding: 6.25em 1.25em;
  height: 100%;

  @media (min-width: $breakpoint-md) {
    padding: 11.25em 2em;
  }

  @media (min-width: $breakpoint-lg) {
    padding: 11.25em 8.25em 11.25em 2.5em;
  }
}

.filters {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  &__list {
    display: flex;
    flex-direction: column;
    gap: 2em;
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
  }
}
</style>
