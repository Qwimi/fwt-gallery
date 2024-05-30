<script lang="ts" setup>
defineProps({
  label: String,
  type: String,
  name: String,
  placeholder: String,
  value: String
})
</script>

<template>
  <div class="custom-form_element">
    <label :for="name" class="custom-form_element_label">{{ label }}</label>
    <input
      class="custom-form_element_input"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :value="value"
    />
  </div>
</template>
