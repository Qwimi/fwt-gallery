<script lang="ts" setup>
import useVuelidate from '@vuelidate/core';
import { computed, ref, type Ref } from 'vue';
import { authRules, useValidationErrors } from '@/helpers/validation';
import ButtonBase from '@/shared/ui/ButtonBase';
import TheInput from '@/shared/ui/TheInput';
import { useAuthStore } from '@/stores/authStore';
import { useModalStore } from '@/stores/modalStore';
import type { AuthForm } from '@/stores/types';

const modalStore = useModalStore();
const authStore = useAuthStore();

const form: Ref<AuthForm> = ref({
  emailValue: '',
  passwordValue: ''
});

const errors = computed(() => useValidationErrors<AuthForm>($v.value.$errors));

const $v = useVuelidate(authRules, form);

const submitForm = async () => {
  const isValid = await $v.value.$validate();

  if (!isValid) return;

  authStore.sentRegisterRequest(form.value);
};
</script>

<template>
  <div class="modal__content">
    <div class="modal__img">
      <img src="@/assets/signup.png" alt="" />
    </div>
    <div class="modal__form">
      <form class="form" @submit.prevent="submitForm">
        <legend class="form__title">Create your profile</legend>
        <p class="form__description">
          If you already have an account, please
          <span class="form__switch" @click="modalStore.openModal('logIn')">log in</span>
        </p>
        <div class="form__inputs">
          <the-input
            v-model="form.emailValue"
            type="email"
            label="email"
            :error="errors.emailValue"
          />
          <the-input
            v-model="form.passwordValue"
            type="password"
            label="password"
            :error="errors.passwordValue"
          />
        </div>
        <button-base variant="default">Sign In</button-base>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  @include authModalMixin;
}

.form {
  @include formMixin;
  @include authFormMixin;

  &__title {
    @media screen and (min-width: $breakpoint-lg) {
      @include headingH2;
    }
  }
}
</style>
