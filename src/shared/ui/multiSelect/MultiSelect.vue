<script lang="ts" setup>
import { ref, type Ref } from 'vue'

import IconExpand from '@/components/icons/IconExpand.vue'
import GenreLabel from '@/shared/ui/label'
import TheCheckbox from '@/shared/ui/theCheckbox'
import type { Genre } from '@/stores/types'

const props = defineProps<{
  label: string
  options: Genre[]
}>()

const isSelectOpen: Ref<boolean> = ref(false)

const selectedGenres: Ref<Genre[]> = ref([])

const deleteSelected = (option: Genre) => {
  const deleteIndex = selectedGenres.value.indexOf(option)
  selectedGenres.value.splice(deleteIndex, 1)
}

const updateSelected = (event: { value: boolean; id: string }) => {
  const focusGenre = props.options.find((option) => option._id == event.id)
  event.value ? selectedGenres.value.push(focusGenre!!) : deleteSelected(focusGenre!!)
}

// defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form-element multiple">
    <label class="form-element__label">{{ label }}</label>
    <div
      class="form-element--wrapper"
      @click="isSelectOpen = !isSelectOpen"
      :class="{ 'multiple--opened': isSelectOpen }"
    >
      <div class="multiple__selected">
        <TransitionGroup name="list">
          <genre-label
            v-for="genre in selectedGenres"
            :key="genre._id"
            :genre="genre"
            :deletable="true"
            @click.stop="deleteSelected(genre)"
          />
        </TransitionGroup>
      </div>
      <IconExpand class="icon multiple--toggler" />
    </div>
    <ul class="multiple__options" v-if="isSelectOpen">
      <li v-for="option in options" :key="option._id" class="multiple__option">
        <the-checkbox
          :id="option._id"
          :label="option.name"
          :checked="selectedGenres.includes(option)"
          @check="updateSelected"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.form-element {
  @include inputMixin;
  &--wrapper {
    height: 3rem;
    position: relative;
    z-index: 2;
  }
}

.multiple {
  &__selected {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    flex: 1;
    margin-left: 1rem;
    .label {
      margin-right: 0.75rem;
    }
  }
  &__options {
    overflow: hidden;
    padding: 1.25rem 0 0.75rem;
    border: 1px solid light-dark(var(--gray_de), transparent);
    background-color: light-dark(var(--white_ff), var(--black_1a));
    border-top: none;
    border-radius: 0.25rem;
    transform: translateY(-0.5rem);
    position: relative;
    z-index: 0;
  }
  &--toggler {
    color: var(--secondary-gray);
    width: 0.75rem;
    transition: transform 0.3s;
    margin-right: 1rem;
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
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}
</style>
