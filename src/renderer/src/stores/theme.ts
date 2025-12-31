import { defineStore } from 'pinia'
import { useColorMode } from '@vueuse/core'
import { computed } from 'vue'

export type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  // Use @vueuse/core's useColorMode for shadcn-vue compatible theming
  const mode = useColorMode({
    attribute: 'class',
    modes: {
      light: 'light',
      dark: 'dark'
    },
    storageKey: 'vueuse-color-scheme',
    initialValue: 'dark'
  })

  const theme = computed<Theme>(() => {
    return mode.value === 'dark' ? 'dark' : 'light'
  })

  const isDark = computed(() => mode.value === 'dark')

  const setTheme = (newTheme: Theme): void => {
    mode.value = newTheme
  }

  const toggleTheme = (): void => {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
  }

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
    mode
  }
})
