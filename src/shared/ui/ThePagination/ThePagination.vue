<script setup lang="ts">
import IconArrow from '@/components/icons/IconArrow.vue';

const props = defineProps<{
  pagesCount: number;
  modelValue: number;
}>();

const emit = defineEmits(['update:modelValue']);

const changePage = (page: number) => {
  emit('update:modelValue', page);
};

const checkSymbol = (page: number) => {
  switch (page) {
    case 1:
    case props.modelValue:
    case props.modelValue + 1:
    case props.modelValue - 1:
    case props.pagesCount:
      return page;
    case props.modelValue + 2:
    case props.modelValue - 2:
      return '...';
  }
};
</script>

<template>
  <div class="pagination">
    <button
      class="pagination__button pagination__button--prev"
      @click="changePage(modelValue == 1 ? pagesCount : modelValue - 1)"
    >
      <icon-arrow class="icon" />
    </button>
    <div class="pagination__items">
      <template v-for="page in pagesCount" :key="page">
        <button
          class="pagination__item"
          :class="{ 'pagination__item--active': page == modelValue }"
          @click="$emit('update:modelValue', page)"
          v-if="checkSymbol(page)"
        >
          {{ checkSymbol(page) }}
        </button>
      </template>
    </div>
    <button
      class="pagination__button pagination__button--next"
      @click="changePage(modelValue == pagesCount ? 1 : modelValue + 1)"
    >
      <icon-arrow class="icon" />
    </button>
  </div>
</template>

<style lang="scss">
.pagination {
  display: flex;
  gap: 1.25rem;
  align-items: center;
  justify-content: center;

  &__items {
    display: flex;
    gap: 0.25rem;
    align-items: center;
  }

  &__item,
  &__button {
    @include buttonMixin;
    @include paragraphBaseLight;
    color: var(--text-secondary);
  }

  &__item {
    padding: 0.125rem 0.5rem;
    border-radius: 0.25rem;

    &--active {
      background-color: light-dark(#1212120d, var(--black_1a));
    }

    &:hover,
    &--active {
      @include paragraphBaseMedium;
    }
  }

  &__button {
    &--prev {
      rotate: 180deg;
    }
    &:hover {
      color: var(--text-primary);
    }
  }
}
</style>
