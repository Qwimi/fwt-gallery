<script lang="ts" setup>
import { type InputHTMLAttributes } from 'vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import TheInput from '@/shared/ui/TheInput';

defineProps<{
  error?: string;
  inputAttributes?: InputHTMLAttributes;
  modelValue?: string;
}>();

defineEmits(['update:modelValue']);
</script>

<template>
  <the-input
    type="text"
    :error="error"
    :input-attributes="inputAttributes"
    variant="thin"
    v-bind:model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template #icon><icon-search class="icon" /></template>
  </the-input>
</template>
