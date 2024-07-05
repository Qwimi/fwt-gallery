<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import TheInput from '@/shared/ui/TheInput';

defineProps<{
  placeholder?: string;
  error?: string;
}>();

const searchString: Ref<string | null> = ref(null);

const search = () => {
  console.log(searchString.value);
};
</script>

<template>
  <the-input
    type="text"
    :error="error"
    :input-attributes="{ placeholder: placeholder }"
    v-model="searchString"
    @update:model-value="search"
  >
    <template #icon><icon-search class="icon" /></template>
  </the-input>
</template>
