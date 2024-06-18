<script lang="ts" setup>
import IconError from '@/components/icons/IconError.vue'
import IconEyeHide from '@/components/icons/IconEyeHide.vue'
import IconEye from '@/components/icons/IconEye.vue'
import { computed, ref, type Ref } from 'vue'

const props = defineProps<{
  label: string
  type: string
  // value?: string
  placeholder?: string
  error?: string
  theme?: string
}>()
defineEmits(['update:modelValue'])

// const isPassword = props.type == 'password'
const inputType: Ref<string> = ref(props.type)
// const isPasswordShow = computed(() => inputType.value == 'text')

// const showPassword = () => (inputType.value = isPasswordShow.value ? 'password' : 'text')
</script>

<template>
  <div class="form__element" :class="[`form__element--${theme}`, { error: error }]">
    <label class="form__element__label">{{ label }}</label>
    <div class="form__element--wrapper">
      <input
        class="form__element__input"
        :type="inputType"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <!-- <div class="form__element__type-toggler" v-if="isPassword && value" @click="showPassword">
        <icon-eye-hide class="icon" v-if="isPasswordShow" />
        <icon-eye class="icon" v-else />
      </div> -->
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
