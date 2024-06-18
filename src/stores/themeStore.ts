import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme: Ref<string> = ref('light')

  const saveTheme = (theme: string) => {
    localStorage.setItem('theme', theme)
  }

  const setTheme = () => {
    document.body.setAttribute('theme', theme.value)
    saveTheme(theme.value)
  }

  const getTheme = () => {
    theme.value = localStorage.getItem('theme') || 'light'
    setTheme()
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    setTheme()
  }

  getTheme()

  return { theme, toggleTheme }
})
