import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isThemeLight: Ref<boolean> = ref(true)
  function toggleTheme() {
    isThemeLight.value = !isThemeLight.value
    console.log(isThemeLight)
    document.body.hasAttribute('theme')
      ? document.body.removeAttribute('theme')
      : document.body.setAttribute('theme', 'dark')
  }
  return { isThemeLight, toggleTheme }
})
