<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Languages, Check } from 'lucide-vue-next'
import { Button } from '@renderer/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'

const { t, locale } = useI18n()

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'lo', label: 'ລາວ', flag: '🇱🇦' }
]

const selectLanguage = (code: string): void => {
  locale.value = code
  localStorage.setItem('locale', code)
}

const currentLanguage = (): { code: string; label: string; flag: string } => {
  return languages.find((l) => l.code === locale.value) || languages[0]
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="sm" :title="t('language.select')" class="gap-2">
        <Languages class="h-4 w-4" />
        <span class="text-base">{{ currentLanguage().flag }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-40">
      <DropdownMenuItem
        v-for="lang in languages"
        :key="lang.code"
        class="gap-2 cursor-pointer"
        @click="selectLanguage(lang.code)"
      >
        <span class="text-lg">{{ lang.flag }}</span>
        <span class="flex-1">{{ lang.label }}</span>
        <Check v-if="locale === lang.code" class="h-4 w-4 text-primary" />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
