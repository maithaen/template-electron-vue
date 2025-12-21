<script setup lang="ts">
import { useSidebarStore } from '@renderer/stores/sidebar'
import { useI18n } from 'vue-i18n'
import { Bell, Search } from 'lucide-vue-next'
import ThemeToggle from './ThemeToggle.vue'
import LanguageSelector from './LanguageSelector.vue'

const { t } = useI18n()
const sidebarStore = useSidebarStore()

defineProps<{
  title?: string
}>()
</script>

<template>
  <header class="header" :class="{ 'sidebar-collapsed': sidebarStore.isCollapsed }">
    <div class="header-left">
      <h1 class="page-title">{{ title || t('app.title') }}</h1>
    </div>

    <div class="header-center">
      <div class="search-box">
        <Search class="search-icon" />
        <input type="text" :placeholder="t('common.search')" class="search-input" />
      </div>
    </div>

    <div class="header-right">
      <button class="icon-button" :title="t('common.notifications')">
        <Bell class="button-icon" />
        <span class="notification-badge">3</span>
      </button>

      <LanguageSelector />
      <ThemeToggle />

      <div class="user-avatar">
        <span>U</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  right: 0;
  left: var(--sidebar-width);
  height: var(--header-height);
  background: var(--header-bg);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  gap: 1rem;
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px);
  z-index: 50;
}

.header.sidebar-collapsed {
  left: var(--sidebar-collapsed-width);
}

.header-left {
  flex: 1;
}

.page-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.header-center {
  flex: 2;
  max-width: 480px;
}

.search-box {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--text-muted);
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  background: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-color-alpha);
}

.header-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
}

.icon-button {
  position: relative;
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

.icon-button:hover {
  background: var(--hover-bg);
  color: var(--primary-color);
  border-color: var(--primary-color);
  transform: scale(1.05);
}

.button-icon {
  width: 20px;
  height: 20px;
}

.notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: linear-gradient(135deg, #ef4444, #f97316);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.user-avatar:hover {
  transform: scale(1.05);
}
</style>
