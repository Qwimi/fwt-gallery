import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isThemeLight: Ref<boolean> = ref(true)

  const saveTheme = (theme: string) => {
    localStorage.setItem('theme', theme)
  }

  const setTheme = () => {
    const theme = isThemeLight.value ? 'light' : 'dark'
    document.body.setAttribute('theme', theme)
    saveTheme(theme)
  }

  const getTheme = () => {
    isThemeLight.value = localStorage.getItem('theme') == 'light'
    setTheme()
  }

  const toggleTheme = () => {
    isThemeLight.value = !isThemeLight.value
    setTheme()
  }

  return { isThemeLight, toggleTheme, getTheme }
})
