<script lang="ts" setup>
import IconEdit from '@/components/icons/IconEdit.vue'
</script>

<template>
  <div class="wrapper">
    <div class="about">
      <icon-edit />
      <h1>This is an about page</h1>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
