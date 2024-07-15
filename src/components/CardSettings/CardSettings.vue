<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import IconSettings from '@/components/icons/IconSettings.vue';
import ButtonBase from '@/shared/ui/ButtonBase';
import { useAuthStore } from '@/stores/authStore';
import type { CardInterface } from '@/stores/types';

const props = defineProps<{
  card: CardInterface;
  mainPainting?: string | null;
}>();

defineEmits(['makeTheCover', 'editPic', 'deletePic']);

const isModalOpen: Ref<boolean> = ref(false);
const buttonText = computed(() =>
  props.mainPainting === props.card.id ? 'Remove the cover' : 'Make the cover'
);
</script>

<template>
  <div class="card-settings" v-if="useAuthStore().isUserAuth">
    <button-base variant="icon-always-light" @click="isModalOpen = !isModalOpen">
      <template #icon><icon-settings class="icon" /></template>
    </button-base>
    <Transition name="fade">
      <div class="card-settings__modal" v-if="isModalOpen">
        <button class="card-settings__item" @click="$emit('makeTheCover', card.id)">
          {{ buttonText }}
        </button>
        <button class="card-settings__item" @click="$emit('editPic', card)">Edit</button>
        <button class="card-settings__item" @click="$emit('deletePic', card.id)">Delete</button>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.card-settings {
  position: absolute;
  z-index: 1;
  padding: 0.75rem;
  &__modal {
    padding: 1rem 0;
    background-color: var(--background-secondary);
    border-radius: 0.25rem;
  }
  &__item {
    @include buttonMixin;
    @include inputText;
    padding: 0.25rem 1rem;
    display: flex;
    width: -webkit-fill-available;
    justify-content: flex-start;
    &:hover {
      background-color: var(--background-primary);
      color: light-dark(var(--black_12), var(--accent));
    }
  }
}

.fade {
  @include fade(0.3s);
}
</style>
