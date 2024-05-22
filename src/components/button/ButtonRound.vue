<script lang="ts" setup>
import IconArrow from '../icons/IconArrow.vue'
</script>

<template>
  <button class="button button-round">
    <span class="button_icon icon">
      <icon-arrow />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button-round {
  aspect-ratio: 1/1;
  padding: 1.125rem;
  border: 1px solid var(--secondary-gray);
  border-radius: 100%;
  background-color: var(--background-secondary);
  color: var(--primary-text-dafault);
  &:hover {
    background-color: var(--background);
  }
  .icon {
    rotate: 270deg;
  }
}

[theme='dark'] {
  .button-round {
    border: none;
  }
}
</style>
