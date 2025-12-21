import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>((localStorage.getItem('theme') as Theme) || 'system')

  const getSystemTheme = (): 'light' | 'dark' => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const applyTheme = (newTheme: Theme): void => {
    const root = document.documentElement
    const effectiveTheme = newTheme === 'system' ? getSystemTheme() : newTheme

    root.classList.remove('light', 'dark')
    root.classList.add(effectiveTheme)
    root.setAttribute('data-theme', effectiveTheme)
  }

  const setTheme = (newTheme: Theme): void => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  const toggleTheme = (): void => {
    const themes: Theme[] = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  // Watch for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', () => {
    if (theme.value === 'system') {
      applyTheme('system')
    }
  })

  // Initialize theme on store creation
  applyTheme(theme.value)

  watch(theme, (newTheme): void => {
    applyTheme(newTheme)
  })

  return {
    theme,
    setTheme,
    toggleTheme,
    getSystemTheme
  }
})
