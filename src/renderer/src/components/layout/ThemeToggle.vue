<script setup lang="ts">
import { useThemeStore, type Theme } from '@renderer/stores/theme'
import { useI18n } from 'vue-i18n'
import { Sun, Moon, Monitor } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const { t } = useI18n()
const themeStore = useThemeStore()
const isOpen = ref(false)

const themes: { id: Theme; icon: typeof Sun; labelKey: string }[] = [
  { id: 'light', icon: Sun, labelKey: 'theme.light' },
  { id: 'dark', icon: Moon, labelKey: 'theme.dark' },
  { id: 'system', icon: Monitor, labelKey: 'theme.system' }
]

const currentTheme = computed(() => {
  return themes.find((t) => t.id === themeStore.theme) || themes[0]
})

const toggleDropdown = (): void => {
  isOpen.value = !isOpen.value
}

const selectTheme = (theme: Theme): void => {
  themeStore.setTheme(theme)
  isOpen.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent): void => {
  const target = event.target as HTMLElement
  if (!target.closest('.theme-toggle')) {
    isOpen.value = false
  }
}

if (typeof window !== 'undefined') {
  document.addEventListener('click', handleClickOutside)
}
</script>

<template>
  <div class="theme-toggle">
    <button class="toggle-button" :title="t('theme.toggle')" @click="toggleDropdown">
      <component :is="currentTheme.icon" class="toggle-icon" />
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="dropdown">
        <button
          v-for="theme in themes"
          :key="theme.id"
          class="dropdown-item"
          :class="{ active: themeStore.theme === theme.id }"
          @click="selectTheme(theme.id)"
        >
          <component :is="theme.icon" class="item-icon" />
          <span>{{ t(theme.labelKey) }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.theme-toggle {
  position: relative;
}

.toggle-button {
  width: 40px;
  height: 40px;
  background: var(--button-bg);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.toggle-button:hover {
  background: var(--hover-bg);
  color: var(--primary-color);
  border-color: var(--primary-color);
  transform: scale(1.05);
}

.toggle-icon {
  width: 20px;
  height: 20px;
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

.item-icon {
  width: 16px;
  height: 16px;
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
