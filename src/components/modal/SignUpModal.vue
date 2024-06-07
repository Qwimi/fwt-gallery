<script lang="ts" setup>
import TheInput from '@/shared/ui/input/TheInput.vue'
import ButtonBase from '@/shared/ui/button/ButtonBase.vue'
import { ref, type Ref } from 'vue'
import { useModalStore } from '@/stores/modalStore'

defineProps<{ theme: string }>()

const modalStore = useModalStore()
const emailVal: Ref<string> = ref('')
const passwordVal: Ref<string> = ref('')
</script>

<template>
  <div class="modal__content modal--auth__content">
    <div class="modal--auth__content__img">
      <img src="@/assets/signup.png" alt="" />
    </div>
    <div class="modal--auth__content__form">
      <form class="form--auth" :class="`form--${theme}`">
        <legend class="form--auth__title">Create your profile</legend>
        <p class="form--auth__description">
          If you already have an account, please
          <span class="form--auth__switch" @click="modalStore.openModal('logIn')">log in</span>
        </p>
        <div class="form--auth__inputs">
          <the-input
            v-model="emailVal"
            :type="'email'"
            :name="'email'"
            :label="'email'"
            :theme="theme"
          />
          <the-input
            v-model="passwordVal"
            :type="'password'"
            :name="'password'"
            :label="'password'"
            :theme="theme"
          />
        </div>
        <button-base :variant="'default'" :theme="theme">sign in</button-base>
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
