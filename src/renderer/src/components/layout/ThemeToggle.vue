<script setup lang="ts">
import { useThemeStore } from '@renderer/stores/theme'
import { useI18n } from 'vue-i18n'
import { Sun, Moon } from 'lucide-vue-next'
import { Button } from '@renderer/components/ui/button'

const { t } = useI18n()
const themeStore = useThemeStore()
</script>

<template>
  <Button
    variant="outline"
    size="icon"
    :title="t('theme.toggle')"
    class="relative"
    @click="themeStore.toggleTheme()"
  >
    <Sun
      class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <Moon
      class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">{{ t('theme.toggle') }}</span>
  </Button>
</template>
