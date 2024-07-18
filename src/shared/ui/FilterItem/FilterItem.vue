<script lang="ts" setup>
import { ref } from 'vue';
import IconMinus from '@/components/icons/IconMinus.vue';
import IconPlus from '@/components/icons/IconPlus.vue';

const props = defineProps<{
  label: string;
  type: 'checkbox' | 'radio';
  options: Array<{ _id: string; name: string }>;
  modelValue: string | string[];
}>();

const emit = defineEmits(['update:modelValue']);

const updateValue = (element: HTMLInputElement) => {
  if (props.type == 'checkbox') {
    const selectedArray = ref([...props.modelValue]);
    if (element.checked) {
      selectedArray.value.push(element.value);
    } else {
      selectedArray.value = selectedArray.value.filter((elem: string) => elem !== element.value);
    }
    emit('update:modelValue', selectedArray.value);
  } else {
    emit('update:modelValue', element.value);
  }
};
</script>

<template>
  <details class="filter-item">
    <summary class="filter-item__title">
      <p v-if="label">
        {{ label }}{{ type == 'checkbox' && modelValue.length ? `(${modelValue.length})` : '' }}
      </p>
      <button class="filter-item__toggler" @click.prevent>
        <icon-plus class="icon icon--show" />
        <icon-minus class="icon icon--hide" />
      </button>
    </summary>
    <div class="filter-item__body">
      <label v-for="option in options" :key="option._id" class="filter-item__option">
        <input
          :type="type"
          :name="label"
          class="filter-item__input"
          :value="option._id"
          @change="updateValue($event.target as HTMLInputElement)"
        />
        {{ option.name }}
      </label>
    </div>
  </details>
</template>

<style lang="scss" scoped>
.filter-item {
  .icon--hide {
    display: none;
  }

  &__title {
    @include headingH6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    color: var(--text-primary);

    @media (min-width: $breakpoint-md) {
      @include headingH4;
    }
  }

  &__toggler {
    @include buttonMixin;
  }

  &[open] {
    .icon--hide {
      display: block;
    }

    .icon--show {
      display: none;
    }
  }

  &[open] &__title {
    margin-bottom: 1rem;
  }

  &__body {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-auto-flow: column;
    gap: 0.75rem;
  }

  &__option {
    @include paragraphSmallLight;
    color: var(--text-secondary);
    cursor: pointer;
  }

  &__option:has(:checked) {
    @include paragraphSmallMedium;
    color: light-dark(var(--text-primary), var(--accent));
  }

  &__input {
    display: none;
  }
}
</style>
