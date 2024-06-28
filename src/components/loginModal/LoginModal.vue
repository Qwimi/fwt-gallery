<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'
import { computed, ref, type Ref } from 'vue'

import { rules, useValidationErrors } from '../auth/validation'

import ButtonBase from '@/shared/ui/button'
import TheInput from '@/shared/ui/theInput'
import { useAuthStore } from '@/stores/authStore'
import { useModalStore } from '@/stores/modalStore'
import type { AuthForm } from '@/stores/types'

const modalStore = useModalStore()
const authStore = useAuthStore()

const form: Ref<AuthForm> = ref({
  emailValue: '',
  passwordValue: ''
})

const errors = computed(() => useValidationErrors<AuthForm>($v.value.$errors))

const $v = useVuelidate(rules, form)

const submitForm = async () => {
  const isValid = await $v.value.$validate()
  if (isValid) {
    authStore.sentAuthRequest(form.value, true)
  }
}
</script>

<template>
  <div class="modal-auth__content">
    <div class="modal-auth__img">
      <img src="@/assets/login.png" alt="" />
    </div>
    <div class="modal-auth__form">
      <form class="auth-form" @submit.prevent="submitForm">
        <legend class="auth-form__title">Welcome back</legend>
        <p class="auth-form__description">
          If you don't have an account yet, please
          <span class="auth-form__switch" @click="modalStore.openModal('signUp')">sign up</span>
        </p>
        <div class="auth-form__inputs">
          <the-input
            v-model="form.emailValue"
            :type="'email'"
            :label="'email'"
            :error="errors.emailValue"
          />
          <the-input
            v-model="form.passwordValue"
            :type="'password'"
            :label="'password'"
            :value="form.passwordValue"
            :error="errors.passwordValue"
          />
        </div>
        <button-base :variant="'default'">log in</button-base>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-auth {
  @include modalMixin;
}
</style>
