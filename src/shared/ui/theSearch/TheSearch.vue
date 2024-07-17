<script lang="ts" setup>
import { ref, type InputHTMLAttributes, type Ref } from 'vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import TheInput from '@/shared/ui/TheInput';

defineProps<{
  error?: string;
  inputAttributes?: InputHTMLAttributes;
}>();

const searchString: Ref<string | null> = ref(null);
</script>

<template>
  <the-input
    type="text"
    :error="error"
    :input-attributes="inputAttributes"
    :class="'form-element--thin'"
    v-model="searchString"
    @update:model-value="$emit('update:searchString', $event)"
  >
    <template #icon><icon-search class="icon" /></template>
  </the-input>
</template>
