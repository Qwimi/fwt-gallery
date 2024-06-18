<script lang="ts" setup>
import TheInput from '@/shared/ui/input/TheInput.vue'
import ButtonBase from '@/shared/ui/button/ButtonBase.vue'
import { computed, ref, type Ref } from 'vue'
import { useModalStore } from '@/stores/modalStore'
import useVuelidate from '@vuelidate/core'
import { rules, useValidationErrors } from './validation'
import type { AuthForm } from '@/stores/types'
import { useAuthStore } from '@/stores/authStore'

defineProps<{ theme?: string }>()

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
  <div class="modal__content modal--auth__content">
    <div class="modal--auth__content__img">
      <img src="@/assets/signup.png" alt="" />
    </div>
    <div class="modal--auth__content__form">
      <form class="form--auth" :class="`form--${theme}`" @submit.prevent="submitForm">
        <legend class="form--auth__title">Create your profile</legend>
        <p class="form--auth__description">
          If you already have an account, please
          <span class="form--auth__switch" @click="modalStore.openModal('logIn')">log in</span>
        </p>
        <div class="form--auth__inputs">
          <TheInput
            v-model="form.emailValue"
            :type="'email'"
            :label="'email'"
            :theme="theme"
            :error="errors.emailValue"
          />
          <TheInput
            v-model="form.passwordValue"
            :type="'password'"
            :label="'password'"
            :theme="theme"
            :error="errors.passwordValue"
          />
        </div>
        <ButtonBase variant="default" :theme="theme">Sign In</ButtonBase>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form--auth__title {
  @media screen and (min-width: $breakpoint-lg) {
    @include headingH2;
  }
}
</style>
