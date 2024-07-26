<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import IconSettings from '@/components/icons/IconSettings.vue';
import ButtonBase from '@/shared/ui/ButtonBase';
import { useArtistStore } from '@/stores/artistStore';
import { useAuthStore } from '@/stores/authStore';

const props = defineProps<{
  card: string;
}>();

const mainPainting = computed(() => useArtistStore().currentArtist?.mainPainting?._id);

defineEmits(['makeTheCover', 'editPic', 'deletePic']);

const isModalOpen: Ref<boolean> = ref(false);
const buttonText = computed(() =>
  mainPainting.value === props.card ? 'Remove the cover' : 'Make the cover'
);
</script>

<template>
  <div class="card-settings" v-if="useAuthStore().isUserAuth">
    <button-base variant="icon-always-light" @click="isModalOpen = !isModalOpen">
      <template #icon><icon-settings class="icon" /></template>
    </button-base>
    <Transition name="fade">
      <div class="card-settings__modal" v-if="isModalOpen">
        <button class="card-settings__item" @click="$emit('makeTheCover')">
          {{ buttonText }}
        </button>
        <button class="card-settings__item" @click="$emit('editPic')">Edit</button>
        <button class="card-settings__item" @click="$emit('deletePic')">Delete</button>
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
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      bottom: 100%;
      left: 0.75rem;
      transform: translateX(-50%);
      border: 0.25rem solid transparent;
      border-top: none;
      border-bottom-color: var(--background-secondary);
    }
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
