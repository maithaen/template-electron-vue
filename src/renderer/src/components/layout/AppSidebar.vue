<script setup lang="ts">
import { useSidebarStore } from '@renderer/stores/sidebar'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import {
  Home,
  LayoutDashboard,
  Settings,
  Users,
  FileBarChart,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const sidebarStore = useSidebarStore()

const menuItems = [
  { id: 'home', icon: Home, labelKey: 'sidebar.home', path: '/' },
  { id: 'dashboard', icon: LayoutDashboard, labelKey: 'sidebar.dashboard', path: '/dashboard' },
  { id: 'users', icon: Users, labelKey: 'sidebar.users', path: '/users' },
  { id: 'reports', icon: FileBarChart, labelKey: 'sidebar.reports', path: '/reports' },
  { id: 'settings', icon: Settings, labelKey: 'sidebar.settings', path: '/settings' },
  { id: 'help', icon: HelpCircle, labelKey: 'sidebar.help', path: '/help' }
]

const isActiveItem = (item: { id: string; path: string }): boolean => {
  if (item.path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(item.path)
}

const handleItemClick = (item: { id: string; path: string }): void => {
  sidebarStore.setActiveItem(item.id)
  router.push(item.path)
}
</script>

<template>
  <aside class="sidebar" :class="{ collapsed: sidebarStore.isCollapsed }">
    <!-- Logo Section -->
    <div class="sidebar-header">
      <div class="logo">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
            <line x1="12" y1="22" x2="12" y2="15.5" />
            <polyline points="22,8.5 12,15.5 2,8.5" />
          </svg>
        </div>
        <span v-if="!sidebarStore.isCollapsed" class="logo-text">{{ t('app.title') }}</span>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="sidebar-nav">
      <ul class="menu-list">
        <li
          v-for="item in menuItems"
          :key="item.id"
          class="menu-item"
          :class="{ active: isActiveItem(item) }"
          @click="handleItemClick(item)"
        >
          <component :is="item.icon" class="menu-icon" />
          <span v-if="!sidebarStore.isCollapsed" class="menu-label">
            {{ t(item.labelKey) }}
          </span>
          <div v-if="sidebarStore.isCollapsed" class="tooltip">
            {{ t(item.labelKey) }}
          </div>
        </li>
      </ul>
    </nav>

    <!-- Toggle Button -->
    <button
      class="sidebar-toggle"
      :title="sidebarStore.isCollapsed ? t('sidebar.expand') : t('sidebar.collapse')"
      @click="sidebarStore.toggle"
    >
      <ChevronLeft v-if="!sidebarStore.isCollapsed" class="toggle-icon" />
      <ChevronRight v-else class="toggle-icon" />
    </button>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: var(--sidebar-width);
  background: var(--sidebar-bg);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
  backdrop-filter: blur(12px);
}

.sidebar.collapsed {
  width: var(--sidebar-collapsed-width);
}

.sidebar-header {
  padding: 1.25rem;
  border-bottom: 1px solid var(--border-color);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-icon svg {
  width: 22px;
  height: 22px;
  color: white;
}

.logo-text {
  font-size: 1.1rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0.75rem;
  overflow-y: visible;
  overflow-x: visible;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.menu-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.menu-item:hover {
  background: var(--hover-bg);
  color: var(--text-primary);
}

.menu-item.active {
  background: linear-gradient(135deg, var(--primary-color-alpha), var(--accent-color-alpha));
  color: var(--primary-color);
  font-weight: 500;
}

.menu-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 60%;
  background: var(--primary-color);
  border-radius: 0 4px 4px 0;
}

.menu-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.menu-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tooltip {
  position: absolute;
  left: calc(100% + 10px);
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5rem 0.75rem;
  background: var(--tooltip-bg);
  color: var(--tooltip-text);
  border-radius: 6px;
  font-size: 0.875rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 9999;
}

.menu-item:hover .tooltip {
  opacity: 1;
  visibility: visible;
}

.sidebar-toggle {
  position: absolute;
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background: var(--sidebar-bg);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sidebar-toggle:hover {
  background: var(--hover-bg);
  color: var(--primary-color);
  transform: translateY(-50%) scale(1.1);
}

.toggle-icon {
  width: 14px;
  height: 14px;
}
</style>
