<script lang="ts" setup>
import TheInput from '@/shared/ui/input/TheInput.vue'
import ButtonBase from '@/shared/ui/button/ButtonBase.vue'
import { computed, ref, type Ref } from 'vue'
import { useModalStore } from '@/stores/modalStore'
import useVuelidate from '@vuelidate/core'
import { rules, useValidationErrors } from './validation'
import type { authForm } from '@/stores/types'

defineProps<{ theme: string }>()

const modalStore = useModalStore()

const form: Ref<authForm> = ref({
  emailValue: '',
  passwordValue: ''
})

const errors = computed(() => useValidationErrors<authForm>($v.value.$errors))

const $v = useVuelidate(rules, form)

const submitForm = () => {
  const result = $v.value.$validate()
  result.then((res) => {
    if (res) {
      console.log('Form submitted.')
    }
  })
}
</script>

<template>
  <div class="modal__content modal--auth__content">
    <div class="modal--auth__content__img">
      <img src="@/assets/login.png" alt="" />
    </div>
    <div class="modal--auth__content__form">
      <form class="form--auth" :class="`form--${theme}`" @submit.prevent="submitForm">
        <legend class="form--auth__title">Welcome back</legend>
        <p class="form--auth__description">
          If you don't have an account yet, please
          <span class="form--auth__switch" @click="modalStore.openModal('signUp')">sign up</span>
        </p>
        <div class="form--auth__inputs">
          <the-input
            v-model="form.emailValue"
            :type="'email'"
            :name="'email'"
            :label="'email'"
            :theme="theme"
            :error="errors.emailValue"
          />
          <the-input
            v-model="form.passwordValue"
            :type="'password'"
            :name="'password'"
            :label="'password'"
            :theme="theme"
            :error="errors.passwordValue"
          />
        </div>
        <button-base :variant="'default'" :theme="theme">log in</button-base>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
