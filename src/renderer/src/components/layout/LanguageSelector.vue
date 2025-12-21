<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Languages } from 'lucide-vue-next'
import { ref } from 'vue'

const { t, locale } = useI18n()
const isOpen = ref(false)

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'lo', label: 'ລາວ', flag: '🇱🇦' }
]

const toggleDropdown = (): void => {
  isOpen.value = !isOpen.value
}

const selectLanguage = (code: string): void => {
  locale.value = code
  localStorage.setItem('locale', code)
  isOpen.value = false
}

const currentLanguage = (): { code: string; label: string; flag: string } => {
  return languages.find((l) => l.code === locale.value) || languages[0]
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent): void => {
  const target = event.target as HTMLElement
  if (!target.closest('.language-selector')) {
    isOpen.value = false
  }
}

if (typeof window !== 'undefined') {
  document.addEventListener('click', handleClickOutside)
}
</script>

<template>
  <div class="language-selector">
    <button class="selector-button" :title="t('language.select')" @click="toggleDropdown">
      <Languages class="selector-icon" />
      <span class="current-flag">{{ currentLanguage().flag }}</span>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="dropdown">
        <button
          v-for="lang in languages"
          :key="lang.code"
          class="dropdown-item"
          :class="{ active: locale === lang.code }"
          @click="selectLanguage(lang.code)"
        >
          <span class="flag">{{ lang.flag }}</span>
          <span>{{ lang.label }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.language-selector {
  position: relative;
}

.selector-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  background: var(--button-bg);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.selector-button:hover {
  background: var(--hover-bg);
  color: var(--primary-color);
  border-color: var(--primary-color);
  transform: scale(1.02);
}

.selector-icon {
  width: 18px;
  height: 18px;
}

.current-flag {
  font-size: 1.1rem;
}

.dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 140px;
  background: var(--dropdown-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 0.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  z-index: 1000;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.625rem 0.875rem;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: var(--text-primary);
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background: var(--hover-bg);
}

.dropdown-item.active {
  background: var(--primary-color-alpha);
  color: var(--primary-color);
}

.flag {
  font-size: 1.25rem;
}

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
