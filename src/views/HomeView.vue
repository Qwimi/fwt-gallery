<script lang="ts" setup>
import IconPlus from '@/components/icons/IconPlus.vue'
import ButtonBase from '@/shared/ui/ButtonBase'
import CardList from '@/shared/ui/CardList'
import { useAuthStore } from '@/stores/authStore'
import { useAppStore } from '@/stores/baseStore'
import { useModalStore } from '@/stores/modalStore'

const store = useAppStore()
const authStore = useAuthStore()
</script>
<template>
  <div class="tools-row" v-if="authStore.isUserAuth">
    <div class="wrapper">
      <button-base :variant="'underline'" @click="useModalStore().openModal('addArtist')">
        <template #icon><icon-plus class="icon" /></template>
        Add artist
      </button-base>
    </div>
  </div>
  <div class="wrapper">
    <card-list :cards="store.artistCards" :is-artists="true" />
  </div>
</template>

<style lang="scss" scoped>
.tools-row {
  @include toolsRow;

  .link {
    &__text {
      @include buttonText;
      display: none;

      @media screen and (min-width: $breakpoint-md) {
        display: inline;
      }
    }

    .icon {
      margin-right: 0.75rem;
      rotate: 180deg;
    }
  }
}
</style>
