<script lang="ts" setup>
import TheInput from '@/components/input/TheInput.vue'
import ButtonDefault from '../button/ButtonDefault.vue'
import { ref, type Ref } from 'vue'
import { useAppStore } from '@/stores/artStore'
import IconClose from '@/components/icons/IconClose.vue'
import { useModalStore } from '@/stores/modalStore'

const modalStore = useModalStore()
const emailVal: Ref<string> = ref('')
const passwordVal: Ref<string> = ref('')
const submitForm = () => {
  useAppStore().userRegistration(emailVal.value, passwordVal.value)
}
</script>

<template>
  <div class="modal modal-auth" @click.stop>
    <icon-close class="icon modal_icon-close" @click="modalStore.closeModal" />
    <div class="modal__content modal__content--auth">
      <div class="modal__content--auth__img">
        <img src="@/assets/signup.png" alt="" />
      </div>
      <div class="modal__content__form">
        <form class="form form--auth" @submit.prevent="submitForm">
          <legend class="form--auth__title form--auth__title--singup">Create your profile</legend>
          <p class="form--auth__description">
            If you already have an account, please
            <span class="form--auth__switch" @click="modalStore.openModal('logIn')">log in</span>
          </p>
          <div class="form__inputs">
            <the-input v-model="emailVal" :type="'email'" :name="'email'" :label="'email'" />
            <the-input
              v-model="passwordVal"
              :type="'password'"
              :name="'password'"
              :label="'password'"
            />
          </div>
          <button-default>sign in</button-default>
        </form>
      </div>
    </div>
  </div>
</template>

<!-- <style lang="scss" scoped>
.form-auth_title {
  @include headingH3;
  @media screen and (min-width: $breakpoint-lg) {
    @include headingH2;
  }
}
</style> -->
