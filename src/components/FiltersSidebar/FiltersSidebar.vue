<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import ButtonBase from '@/shared/ui/ButtonBase';
import FilterItem from '@/shared/ui/FilterItem';
import { useAppStore } from '@/stores/baseStore';

const store = useAppStore();
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

const sentForm = () => {
  store.filterArtists(form);
};

onMounted(() => {
  store.getFilterableGenres();
});
</script>

<template>
  <div class="sidebar__content">
    <form class="filters" @submit.prevent="sentForm" ref="formElement">
      <div class="filters__list">
        <filter-item
          label="Genres"
          :options="store.filterableGenres"
          type="checkbox"
          v-model="form.genres"
        />
        <filter-item label="Sort by" :options="sortByValues" type="radio" v-model="form.orderBy" />
      </div>
      <div class="filters__buttons">
        <button-base variant="underline" :button-props="{ type: 'submit' }">
          Show the results
        </button-base>
        <button-base
          variant="underline"
          :button-props="{ type: 'reset', disabled: !(form.genres.length || form.orderBy) }"
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

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 1em;

  .icon--hide {
    display: none;
  }

  &__title {
    @include headingH6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  &__toggler {
    @include buttonMixin;
  }

  &[open] {
    .icon--hide {
      display: block;
    }

    .icon--show {
      display: none;
    }
  }

  &__body {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-auto-flow: column;
    gap: 0.75em;
  }
}
</style>
