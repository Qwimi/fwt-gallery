<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import IconError from '@/components/icons/IconError.vue';
import IconExpand from '@/components/icons/IconExpand.vue';
import GenreLabel from '@/shared/ui/GenreLabel';
import TheCheckbox from '@/shared/ui/TheCheckbox';
import type { Genre } from '@/stores/types';

const props = defineProps<{
  label: string;
  options: Genre[];
  error?: string[];
  modelValue?: string[];
}>();

const emit = defineEmits(['update:modelValue']);

const isSelectOpen: Ref<boolean> = ref(false);

const selectedGenres: Ref<string[]> = ref(props.modelValue || []);

const deleteSelected = (option: string) => {
  selectedGenres.value = selectedGenres.value.filter((element: string) => element != option);
};

const updateSelected = (event: { value?: boolean; id: string }) => {
  event.value ? selectedGenres.value.push(event.id!!) : deleteSelected(event.id!!);
  emit('update:modelValue', selectedGenres.value);
};
</script>

<template>
  <div class="form-element multiple">
    <label class="form-element__label">{{ label }}</label>
    <div
      class="form-element__wrapper"
      @click="isSelectOpen = !isSelectOpen"
      :class="{ 'multiple--opened': isSelectOpen }"
    >
      <div class="multiple__selected">
        <TransitionGroup name="list">
          <template v-for="genre in options" :key="genre._id">
            <genre-label
              :genre="genre"
              variant="deletable"
              v-if="selectedGenres.includes(genre._id)"
              @click.stop="updateSelected({ id: genre._id })"
            />
          </template>
        </TransitionGroup>
      </div>
      <IconExpand class="icon multiple--toggler" />
    </div>
    <ul class="multiple__options" v-if="isSelectOpen">
      <li v-for="option in options" :key="option._id" class="multiple__option">
        <the-checkbox
          :input-attributes="{
            id: option._id,
            checked: selectedGenres.includes(option._id)
          }"
          :label="option.name"
          @check="updateSelected($event)"
        />
      </li>
    </ul>
    <transition name="fade">
      <div class="form-element__error" v-if="error">
        <icon-error class="icon" />
        <p>
          {{ error }}
        </p>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.form-element {
  @include inputMixin;
  &__wrapper {
    height: 3rem;
    position: relative;
    z-index: 2;
  }
  &__error {
    z-index: 0;
  }
}

.multiple {
  &__selected {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    flex: 1;
  }
  &__options {
    overflow: hidden;
    border: 1px solid light-dark(var(--gray_de), transparent);
    background-color: light-dark(var(--white_ff), var(--black_1a));
    border-top: none;
    border-radius: 0.25rem;
    transform: translateY(-0.5rem);
    padding-top: 0.5rem;
    position: absolute;
    width: 100%;
    z-index: 1;
    max-height: calc(150px + 0.5rem);
    overflow-y: auto;
  }
  &--toggler {
    color: var(--secondary-gray);
    width: 0.75rem;
    transition: transform 0.3s;
  }
  &__option {
    padding: 0.5rem 1rem;
    &:hover {
      background-color: var(--background-semi-transparent);
    }
  }
  &--opened,
  &--opened:hover {
    border-color: var(--text-primary);
    .multiple--toggler {
      transform: rotate(-180deg);
    }
  }
  .label {
    margin-right: 1rem;
  }
}

.list,
.fade {
  @include fade(0.5s);
}
</style>
