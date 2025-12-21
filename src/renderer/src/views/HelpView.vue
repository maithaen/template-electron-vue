<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { HelpCircle } from 'lucide-vue-next'

const { t } = useI18n()
</script>

<template>
  <div class="view-container">
    <div class="view-header">
      <HelpCircle class="view-icon" />
      <h1>{{ t('sidebar.help') }}</h1>
    </div>
    <div class="view-content">
      <p>Help content goes here.</p>
    </div>
  </div>
</template>

<style scoped>
.view-container {
  padding: 2rem;
}

.view-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.view-header h1 {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.view-icon {
  width: 28px;
  height: 28px;
  color: var(--primary-color);
}

.view-content {
  color: var(--text-secondary);
}
</style>
