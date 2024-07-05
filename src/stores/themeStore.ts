import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const theme: Ref<string> = ref('light');

  const setTheme = () => {
    document.documentElement.setAttribute('theme', theme.value);
    localStorage.setItem('theme', theme.value);
  };

  const getTheme = () => {
    theme.value = localStorage.getItem('theme') || 'light';
    setTheme();
  };

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    setTheme();
  };

  getTheme();

  return { theme, toggleTheme };
});
