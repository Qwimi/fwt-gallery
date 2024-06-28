<script lang="ts" setup>
import IconError from '@/components/icons/IconError.vue'
import IconSearch from '@/components/icons/IconSearch.vue'

defineProps<{
  placeholder?: string
  error?: string
  modelValue?: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form-element" :class="{ error: error }">
    <div class="form-element--wrapper">
      <icon-search class="icon" />
      <input
        class="form-element__input"
        type="text"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <transition name="fade">
      <div class="form-element__error" v-if="error">
        <icon-error class="icon" />
        <p>
          {{ error }}
        </p>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.form-element {
  @include inputMixin;
  &--wrapper {
    .icon {
      margin-left: 1rem;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
