<script lang="ts" setup>
import IconSuccess from '@/components/icons/IconSuccess.vue'
defineProps<{
  label?: string
  id: string
  checked?: boolean
  theme?: string
}>()
defineEmits(['check'])
</script>

<template>
  <label class="checkbox--container" :class="`checkbox--container--${theme}`">
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
  color: var(--primary-gray-dark);
  .checkbox {
    display: none;
    &--custom {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 0.25rem;
      background-color: var(--secondary-white);
      outline: 1px solid var(--primary-gray-light);
      .icon {
        display: none;
      }
    }
    &:checked {
      + .checkbox--custom {
        .icon {
          display: block;
        }
      }
    }
  }

  &--dark {
    color: var(--primary-gray-light);
    .checkbox--custom {
      background-color: var(--primary-black);
      outline: none;
    }
  }
}
</style>
