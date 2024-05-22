import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isThemeLight: Ref<boolean> = ref(true)

  function getTheme() {
    if (localStorage.getItem('theme') == 'dark') isThemeLight.value = false
    else isThemeLight.value = true
    setTheme(isThemeLight.value)
  }

  function toggleTheme() {
    isThemeLight.value = !isThemeLight.value

    setTheme(isThemeLight.value)
    saveTheme(isThemeLight.value)
  }

  function saveTheme(theme: Boolean) {
    localStorage.setItem('theme', theme ? 'light' : 'dark')
  }
  function setTheme(theme: boolean) {
    theme ? document.body.removeAttribute('theme') : document.body.setAttribute('theme', 'dark')
  }
  return { isThemeLight, toggleTheme, getTheme }
})
