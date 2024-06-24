<script lang="ts" setup>
import IconError from '@/components/icons/IconError.vue'
defineProps<{
  label: string
  placeholder?: string
  error?: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form-element" :class="{ error: error }">
    <label class="form-element__label">{{ label }}</label>
    <div class="form-element--wrapper">
      <textarea
        class="form-element__input"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      ></textarea>
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
  &__input {
    height: 150px;
    resize: none;
    overflow-y: auto;
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
