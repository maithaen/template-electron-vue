<script setup lang="ts">
import { useSidebarStore } from '@renderer/stores/sidebar'
import { useI18n } from 'vue-i18n'
import { Bell, Search } from 'lucide-vue-next'
import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import { Badge } from '@renderer/components/ui/badge'
import { Avatar, AvatarFallback } from '@renderer/components/ui/avatar'
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
      <div class="relative w-full max-w-md">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          :placeholder="t('common.search')"
          class="pl-10 bg-background/50 backdrop-blur-sm"
        />
      </div>
    </div>

    <div class="header-right">
      <Button variant="outline" size="icon" :title="t('common.notifications')" class="relative">
        <Bell class="h-4 w-4" />
        <Badge
          variant="destructive"
          class="absolute -top-1 -right-1 h-5 min-w-5 px-1 text-xs flex items-center justify-center"
        >
          3
        </Badge>
      </Button>

      <LanguageSelector />
      <ThemeToggle />

      <Avatar class="cursor-pointer hover:scale-105 transition-transform">
        <AvatarFallback class="bg-gradient-to-br from-primary to-accent text-primary-foreground">
          U
        </AvatarFallback>
      </Avatar>
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
  background: hsl(var(--background) / 0.8);
  border-bottom: 1px solid hsl(var(--border));
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
  color: hsl(var(--foreground));
  margin: 0;
}

.header-center {
  flex: 2;
  display: flex;
  justify-content: center;
}

.header-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
}
</style>
