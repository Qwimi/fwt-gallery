<template>
  <span class="label">
    <slot></slot>
  </span>
</template>

<style lang="scss" scoped>
.label {
  display: inline-block;
  padding: 0.5rem 1rem;
  color: var(--primary-text-dafault);
  background-color: color-mix(in srgb, var(--primary-black) 5%, transparent);
  border-radius: 2rem;
  @include paragraphSmallMadium;
}

[theme='dark'] {
  .label {
    outline: 1px solid var(--primary-white);
  }
}
</style>
