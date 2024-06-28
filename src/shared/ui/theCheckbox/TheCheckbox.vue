<script lang="ts" setup>
import IconSuccess from '@/components/icons/IconSuccess.vue'
defineProps<{
  label?: string
  id: string
  checked?: boolean
}>()
defineEmits(['check'])
</script>

<template>
  <label class="checkbox--container">
    <input
      class="checkbox"
      type="checkbox"
      :checked="checked"
      @click="$emit('check', { value: ($event.target as HTMLInputElement).checked, id: id })"
    />
    <div class="checkbox--custom">
      <icon-success class="icon" />
    </div>
    {{ label }}
  </label>
</template>

<style lang="scss" scoped>
.checkbox--container {
  @include paragraphBaseLight;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-secondary);
  .checkbox {
    display: none;
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
    &:checked + .checkbox--custom {
      .icon {
        display: block;
      }
    }
  }
}
</style>
