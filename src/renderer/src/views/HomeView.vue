<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Sparkles, Zap, Shield, Globe } from 'lucide-vue-next'

const { t } = useI18n()

const features = [
  {
    icon: Zap,
    titleKey: 'Fast Performance',
    descKey: 'Built with Electron + Vue for blazing fast desktop experience'
  },
  {
    icon: Shield,
    titleKey: 'Secure',
    descKey: 'Enterprise-grade security with isolated processes'
  },
  {
    icon: Globe,
    titleKey: 'Multi-language',
    descKey: 'Support for English and Lao languages out of the box'
  }
]
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-badge">
        <Sparkles class="badge-icon" />
        <span>{{ t('common.version') }} 1.0.0</span>
      </div>

      <h1 class="hero-title">
        {{ t('app.welcome') }}
      </h1>

      <p class="hero-description">
        {{ t('app.description') }}
      </p>

      <div class="hero-actions">
        <button class="btn btn-primary">
          <Zap class="btn-icon" />
          Get Started
        </button>
        <button class="btn btn-secondary">Learn More</button>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="features-grid">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="feature-card card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="feature-icon">
            <component :is="feature.icon" />
          </div>
          <h3 class="feature-title">{{ feature.titleKey }}</h3>
          <p class="feature-desc">{{ feature.descKey }}</p>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stats-card card">
        <div class="stat-item">
          <span class="stat-value text-gradient">100%</span>
          <span class="stat-label">Type Safety</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value text-gradient">2</span>
          <span class="stat-label">Languages</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value text-gradient">∞</span>
          <span class="stat-label">Possibilities</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Hero Section */
.hero-section {
  text-align: center;
  padding: 3rem 0 4rem;
  animation: fadeIn 0.6s ease-out;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--primary-color-alpha);
  border: 1px solid var(--primary-color);
  border-radius: 50px;
  color: var(--primary-color);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.badge-icon {
  width: 16px;
  height: 16px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.hero-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

/* Features Section */
.features-section {
  padding: 2rem 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  animation: fadeIn 0.5s ease-out backwards;
}

.feature-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 1.25rem;
  background: var(--gradient-primary);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.feature-icon svg {
  width: 28px;
  height: 28px;
}

.feature-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.feature-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Stats Section */
.stats-section {
  padding: 2rem 0;
}

.stats-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: 2rem 3rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.stat-divider {
  width: 1px;
  height: 48px;
  background: var(--border-color);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .stats-card {
    flex-direction: column;
    gap: 1.5rem;
  }

  .stat-divider {
    width: 100%;
    height: 1px;
  }
}
</style>
