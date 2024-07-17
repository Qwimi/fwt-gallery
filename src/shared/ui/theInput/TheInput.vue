<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue';
import { ref, type Ref } from 'vue';
import IconError from '@/components/icons/IconError.vue';
import IconEye from '@/components/icons/IconEye.vue';
import IconEyeHide from '@/components/icons/IconEyeHide.vue';

defineProps<{
  type: 'password' | 'text' | 'email' | 'number';
  label?: string;
  error?: string;
  modelValue?: string;
  inputAttributes?: InputHTMLAttributes;
}>();

defineEmits(['update:modelValue']);

const isPasswordShow: Ref<boolean> = ref(false);

const showPassword = () => (isPasswordShow.value = !isPasswordShow.value);
</script>

<template>
  <div class="form-element">
    <p class="form-element__label" v-if="label">{{ label }}</p>
    <label class="form-element__wrapper">
      <slot name="icon"></slot>
      <input
        class="form-element__input"
        :type="type === 'password' && isPasswordShow ? 'text' : type"
        :value="modelValue"
        v-bind="inputAttributes"
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
    </label>
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
    cursor: pointer;
  }
}

input[type='password']::-ms-reveal,
input[type='password']::-ms-clear {
  display: none;
}

input[type='number'] {
  -moz-appearance: textfield;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.fade {
  @include fade(0.5s);
}
</style>
