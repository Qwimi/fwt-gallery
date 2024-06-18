<script lang="ts" setup>
import IconError from '@/components/icons/IconError.vue'
import IconSearch from '@/components/icons/IconSearch.vue'

defineProps<{
  placeholder?: string
  error?: string
  theme?: string
}>()
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form__element" :class="[`form__element--${theme}`, { error: error }]">
    <div class="form__element--wrapper">
      <icon-search class="icon" />
      <input
        class="form__element__input"
        type="text"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <transition name="fade">
      <div class="form__element__error" v-if="error">
        <icon-error class="icon" />
        <p>
          {{ error }}
        </p>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.form__element {
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
