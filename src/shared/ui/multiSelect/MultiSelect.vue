<script lang="ts" setup>
import { ref, type Ref } from 'vue'

import IconExpand from '@/components/icons/IconExpand.vue'
import GenreLabel from '@/shared/ui/GenreLabel'
import TheCheckbox from '@/shared/ui/TheCheckbox'
import type { Genre } from '@/stores/types'

const props = defineProps<{
  label: string
  options: Genre[]
  modelValue?: Genre[]
}>()

const emit = defineEmits(['update:modelValue'])

const isSelectOpen: Ref<boolean> = ref(false)

const selectedGenres: Ref<string[]> = ref(
  props.modelValue?.map((option: Genre) => option._id) || []
)

const deleteSelected = (option: Genre) => {
  selectedGenres.value = selectedGenres.value.filter((element: string) => element != option._id)
}

const updateSelected = (event: { value: boolean; id: string }) => {
  const focusGenre = props.options.find((option) => option._id == event.id)
  event.value ? selectedGenres.value.push(focusGenre?._id!!) : deleteSelected(focusGenre!!)
  emit(
    'update:modelValue',
    props.options.filter((option: Genre) => selectedGenres.value.includes(option._id))
  )
}
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
          <template v-for="genre in options" :key="genre._id">
            <genre-label
              :genre="genre"
              :deletable="true"
              v-if="selectedGenres.includes(genre._id)"
              @click.stop="deleteSelected(genre)"
            />
          </template>
        </TransitionGroup>
      </div>
      <IconExpand class="icon multiple--toggler" />
    </div>
    <ul class="multiple__options" v-if="isSelectOpen">
      <li v-for="option in options" :key="option._id" class="multiple__option">
        <the-checkbox
          :id="option._id"
          :label="option.name"
          :checked="selectedGenres.includes(option._id)"
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
    position: absolute;
    width: 100%;
    z-index: 0;
    max-height: 150px;
    overflow-y: auto;
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
