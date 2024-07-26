<script lang="ts" setup>
import { computed } from 'vue';
import IconClose from '@/components/icons/IconClose.vue';
import TheSearch from '@/shared/ui/TheSearch/TheSearch.vue';
import { useArtistStore } from '@/stores/artistStore';

defineProps<{ isClosable?: boolean }>();
defineEmits(['close']);

const store = useArtistStore();
const searchString = computed(() => store.getSearchString());
const updateSearch = (search: string) => store.setSearchString(search);
</script>

<template>
  <div class="search-container">
    <the-search v-model="searchString" @update:model-value="updateSearch($event)" />
    <button class="search-container__button-close" @click="$emit('close')" v-if="isClosable">
      <icon-close class="icon" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  position: relative;
  &__button-close {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    right: 1rem;
    @include buttonMixin;
  }
}

.icon {
  width: 1em;
}
</style>
