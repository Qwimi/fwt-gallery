<script lang="ts" setup>
import { onMounted } from 'vue'

import ButtonBase from '@/shared/ui/button'
import MultiSelect from '@/shared/ui/multiSelect'
import TheInput from '@/shared/ui/theInput'
import TheTextarea from '@/shared/ui/theTextarea'
import { useAppStore } from '@/stores/baseStore'

const store = useAppStore()

onMounted(() => store.getGenres())
</script>

<template>
  <div class="modal__content">
    <form class="form">
      <div class="form__inputs">
        <the-input :label="'Name*'" :type="'text'" />
        <the-input :label="'Years of life'" :type="'text'" />
        <the-textarea :label="'Description'" />
        <multi-select :label="'Genres*'" :options="store.genres" />
      </div>
      <button-base :variant="'default'">save</button-base>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  &__content {
    flex-direction: column;
    padding: 3.75rem 1.75rem;
    width: 100vw;
    .form {
      @include formMixin;
      align-items: center;
    }

    @media screen and (min-width: $breakpoint-lg) {
      max-width: 800px;
      padding: 5rem 100px;
    }

    // @media screen and (max-width: calc($breakpoint-lg - 1px)) {
    //   min-height: 100vh;
    //   overflow-y: auto;
    // }
  }
}
</style>
