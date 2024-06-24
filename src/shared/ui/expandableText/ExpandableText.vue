<script lang="ts" setup>
import { computed, ref, type Ref } from 'vue'
import ButtonBase from '@/shared/ui/button'
import IconExpand from '@/components/icons/IconExpand.vue'

const props = defineProps<{ text?: string }>()

const maxStrLenght = 265
const isExpanded: Ref<Boolean> = ref(false)
const isExpandable = computed(() => props.text && props.text.length > 265)
const biographyClass = computed(() =>
  !isExpandable.value || isExpanded.value ? '' : 'text--short'
)
const biographyText = computed(() =>
  !isExpandable.value || isExpanded.value ? props.text : `${props.text?.slice(0, maxStrLenght)}...`
)

const toggleExpand = () => (isExpanded.value = !isExpanded.value)
</script>

<template>
  <p class="text" :class="biographyClass">
    {{ biographyText }}
  </p>
  <button-base
    :variant="'underline'"
    class="text-toggler"
    @click="toggleExpand"
    v-if="isExpandable"
  >
    <template v-if="isExpanded">read less</template>
    <template v-else>read more</template>
    <template #icon><icon-expand class="icon" /></template>
  </button-base>
</template>

<style lang="scss" scoped>
.text {
  color: var(--primary-text-dafault);
  @include paragraphBaseLight;

  &.text--short {
    @include textGradient(var(--primary-text-dafault));

    + .text-toggler {
      .icon {
        rotate: 0deg;
      }
    }
  }
}

.text-toggler {
  flex-direction: row-reverse;
  margin-top: 1.25rem;

  .icon {
    rotate: -180deg;
    height: fit-content;
    width: fit-content;
    transition: rotate 0.3s;
  }
}
</style>
