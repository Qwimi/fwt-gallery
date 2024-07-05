<script lang="ts" setup>
import type { TextareaHTMLAttributes } from 'vue';
import IconError from '@/components/icons/IconError.vue';

defineProps<{
  type: 'password' | 'text' | 'email';
  label?: string;
  error?: string;
  modelValue?: string;
  textareaAttributes?: TextareaHTMLAttributes;
}>();

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="form-element" :class="{ error: error }">
    <label class="form-element__label">{{ label }}</label>
    <div class="form-element__wrapper">
      <textarea
        class="form-element__input"
        v-bind="textareaAttributes"
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
