<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import type { Genre } from '@/stores/types'
import TheCheckbox from '@/shared/ui/input/TheCheckbox.vue'
import GenreLabel from '@/shared/ui/label/GenreLabel.vue'
import IconExpand from '@/components/icons/IconExpand.vue'

const props = defineProps<{
  label: string
  options: Genre[]
  theme?: string
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
  <div class="form__element multiple" :class="[`form__element--${theme}`, `multiple--${theme}`]">
    <label class="form__element__label">{{ label }}</label>
    <div
      class="form__element__input"
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
            :theme="theme"
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
          :theme="theme"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.form__element {
  &__input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0;
    padding-bottom: 0;
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
    .label {
      margin-right: 0.75rem;
    }
  }
  &__options {
    overflow: hidden;
    padding: 1.25rem 0 0.75rem;
    border: 1px solid var(--primary-gray-light);
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
  }
  &__option {
    padding: 0.5rem 1rem;
    &:hover {
      background-color: color-mix(in srgb, var(--primary-black) 5%, transparent);
    }
  }
  &--opened {
    border-color: var(--primary-gray-dark);
    .multiple--toggler {
      transform: rotate(-180deg);
    }
  }
  &--dark {
    .multiple__options {
      border-color: transparent;
      background-color: var(--secondary-black);
    }
    .multiple__option {
      &:hover {
        background-color: color-mix(in srgb, #cdcdcd 5%, transparent);
      }
    }
    .multiple--opened {
      border-color: var(--primary-gray-light);
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
