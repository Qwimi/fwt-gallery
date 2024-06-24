<script lang="ts" setup>
import IconError from '@/components/icons/IconError.vue'

defineProps<{
  label: string
  type: string
  placeholder?: string
  error?: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form-element" :class="{ error: error }">
    <label class="form-element__label">{{ label }}</label>
    <div class="form-element--wrapper">
      <input
        class="form-element__input"
        :type="type"
        :placeholder="placeholder"
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
  &__type-toggler {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 1rem;
    cursor: pointer;
  }
}

input[type='password']::-ms-reveal,
input[type='password']::-ms-clear {
  display: none;
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
