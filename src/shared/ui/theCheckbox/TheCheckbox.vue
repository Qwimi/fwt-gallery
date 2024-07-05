<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue';
import IconSuccess from '@/components/icons/IconSuccess.vue';

defineProps<{
  label?: string;
  inputAttributes?: InputHTMLAttributes;
}>();

defineEmits(['check']);
</script>

<template>
  <label class="checkbox">
    <input
      class="checkbox--default"
      type="checkbox"
      v-bind="inputAttributes"
      @click="
        $emit('check', {
          value: ($event.target as HTMLInputElement).checked,
          id: inputAttributes?.id
        })
      "
    />
    <div class="checkbox--custom">
      <icon-success class="icon" />
    </div>
    {{ label }}
  </label>
</template>

<style lang="scss" scoped>
.checkbox {
  @include paragraphBaseLight;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-secondary);

  &--default {
    display: none;
  }

  &--custom {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.25rem;
    background-color: light-dark(var(--white_fc), var(--black_12));
    border: 1px solid light-dark(var(--gray_de), transparent);
    .icon {
      display: none;
    }
  }

  &--default:checked + &--custom {
    .icon {
      display: block;
    }
  }
}
</style>
