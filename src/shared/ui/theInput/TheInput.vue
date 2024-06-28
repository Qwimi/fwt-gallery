<script lang="ts" setup>
import { ref, type Ref } from 'vue'

import IconError from '@/components/icons/IconError.vue'
import IconEye from '@/components/icons/IconEye.vue'
import IconEyeHide from '@/components/icons/IconEyeHide.vue'

defineProps<{
  label: string
  type: 'text' | 'email' | 'password'
  placeholder?: string
  error?: string
  modelValue?: string
}>()

const isPasswordShow: Ref<boolean> = ref(false)

const showPassword = () => (isPasswordShow.value = !isPasswordShow.value)

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form-element" :class="{ error: error }">
    <label class="form-element__label">{{ label }}</label>
    <div class="form-element--wrapper">
      <input
        class="form-element__input"
        :type="isPasswordShow ? 'text' : type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <span
        class="form-element__type-toggler"
        @click="showPassword()"
        v-if="type == 'password' && modelValue"
      >
        <icon-eye-hide class="icon" v-if="isPasswordShow" />
        <icon-eye class="icon" v-else />
      </span>
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
