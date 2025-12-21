import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@renderer/views/HomeView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@renderer/views/DashboardView.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@renderer/views/UsersView.vue')
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import('@renderer/views/ReportsView.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@renderer/views/SettingsView.vue')
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('@renderer/views/HelpView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
