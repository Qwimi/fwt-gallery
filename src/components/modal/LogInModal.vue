<script lang="ts" setup>
import TheInput from '@/shared/ui/input/TheInput.vue'
import ButtonBase from '@/shared/ui/button/ButtonBase.vue'
import { computed, ref, unref, type Ref } from 'vue'
import { useModalStore } from '@/stores/modalStore'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

defineProps<{ theme: string }>()

const modalStore = useModalStore()
const emailValue: Ref<string> = ref('')
const password: Ref<string> = ref('')

const rules = computed(() => ({ emailValue: { required, email }, password: { required } }))
const v$ = useVuelidate(rules, { emailValue, password })

const submitForm = async () => {
  const isFormCorrect = await unref(v$).$validate()
  console.log(isFormCorrect)
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
            v-model="emailValue"
            :type="'email'"
            :name="'email'"
            :label="'email'"
            :theme="theme"
          />
          <the-input
            v-model="password"
            :type="'password'"
            :name="'password'"
            :label="'password'"
            :theme="theme"
          />
        </div>
        <button-base :variant="'default'" :theme="theme">log in</button-base>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
