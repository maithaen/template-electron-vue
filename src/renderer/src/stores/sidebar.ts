import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
  const isCollapsed = ref(localStorage.getItem('sidebar-collapsed') === 'true')
  const activeItem = ref('home')

  const toggle = (): void => {
    isCollapsed.value = !isCollapsed.value
    localStorage.setItem('sidebar-collapsed', String(isCollapsed.value))
  }

  const setActiveItem = (item: string): void => {
    activeItem.value = item
  }

  return {
    isCollapsed,
    activeItem,
    toggle,
    setActiveItem
  }
})
