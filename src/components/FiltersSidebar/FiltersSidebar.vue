<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import ButtonBase from '@/shared/ui/ButtonBase';
import FilterItem from '@/shared/ui/FilterItem';
import { useAppStore } from '@/stores/baseStore';

const store = useAppStore();
const selectedGenres: Ref<string[]> = ref([]);
const selectedSort: Ref<string> = ref('');

const options = [
  'option 1',
  'option 2',
  'option 3',
  'option 4',
  'option 5',
  'option 1',
  'option 2',
  'option 3',
  'option 4',
  'option 5',
  'option 1',
  'option 2',
  'option 3',
  'option 4',
  'option 5',
  'option 1',
  'option 2',
  'option 3',
  'option 4',
  'option 5'
];
</script>

<template>
  <div class="sidebar__content">
    <form class="filters">
      <div class="filters__list">
        <filter-item label="checkbox" :options="options" type="checkbox" v-model="selectedGenres" />
        <filter-item label="radio" :options="options" type="radio" v-model="selectedSort" />
      </div>
      <div class="filters__buttons">
        <button-base variant="underline" :button-props="{ type: 'submit' }">
          Show the results
        </button-base>
        <button-base variant="underline" :button-props="{ type: 'reset' }"> reset </button-base>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.sidebar__content {
  padding: 100px 1.25rem;
  height: 100%;

  @media (min-width: $breakpoint-md) {
    padding: 180px 2rem;
  }

  @media (min-width: $breakpoint-lg) {
    padding: 180px 132px 180px 2.5rem;
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
    gap: 2rem;
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
  }
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;

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
    gap: 0.75rem;
  }
}
</style>
