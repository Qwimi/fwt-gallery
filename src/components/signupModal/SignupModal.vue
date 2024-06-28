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
    authStore.sentRegisterRequest(form.value)
  }
}
</script>

<template>
  <div class="modal-auth__content">
    <div class="modal-auth__img">
      <img src="@/assets/signup.png" alt="" />
    </div>
    <div class="modal-auth__form">
      <form class="auth-form" @submit.prevent="submitForm">
        <legend class="auth-form__title">Create your profile</legend>
        <p class="auth-form__description">
          If you already have an account, please
          <span class="auth-form__switch" @click="modalStore.openModal('logIn')">log in</span>
        </p>
        <div class="auth-form__inputs">
          <TheInput
            v-model="form.emailValue"
            :type="'email'"
            :label="'email'"
            :error="errors.emailValue"
          />
          <TheInput
            v-model="form.passwordValue"
            :type="'password'"
            :label="'password'"
            :error="errors.passwordValue"
          />
        </div>
        <button-base variant="default">Sign In</button-base>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-auth {
  @include modalMixin;
}
.auth-form__title {
  @media screen and (min-width: $breakpoint-lg) {
    @include headingH2;
  }
}
</style>
