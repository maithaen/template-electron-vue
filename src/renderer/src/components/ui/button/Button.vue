<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'text'
type Size = 'sm' | 'md' | 'lg'

const props = defineProps<{
  variant?: Variant
  size?: Size
  disabled?: boolean
  loading?: boolean
  block?: boolean
  type?: 'button' | 'submit' | 'reset'
  href?: string // If provided, renders as <a>
  rel?: string
  target?: '_self' | '_blank' | '_parent' | '_top'
  ariaLabel?: string
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const variant = computed(() => props.variant ?? 'primary')
const size = computed(() => props.size ?? 'md')
const isDisabled = computed(() => !!props.disabled || !!props.loading)
const isBlock = computed(() => !!props.block)

const classes = computed(() => [
  'btn',
  `btn--${variant.value}`,
  `btn--${size.value}`,
  isBlock.value && 'btn--block',
  isDisabled.value && 'is-disabled',
  props.loading && 'is-loading'
])

function onClick(event: MouseEvent): void {
  if (isDisabled.value) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  emit('click', event)
}
</script>

<template>
  <!-- Render as anchor when href is provided -->
  <component
    :is="href ? 'a' : 'button'"
    :class="classes"
    :href="href"
    :rel="href ? rel : undefined"
    :target="href ? target : undefined"
    :type="href ? undefined : (type ?? 'button')"
    :aria-disabled="isDisabled || undefined"
    :aria-busy="loading || undefined"
    :tabindex="isDisabled ? -1 : 0"
    :aria-label="ariaLabel"
    @click="onClick"
  >
    <!-- Optional icon slot -->
    <span v-if="$slots.icon" class="btn__icon">
      <slot name="icon" />
    </span>

    <!-- Label / default slot -->
    <span class="btn__label">
      <slot />
    </span>

    <!-- Loading spinner -->
    <span v-if="loading" class="btn__spinner" aria-hidden="true"></span>
  </component>
</template>

<style scoped>
/* Theme variables (override in parent if desired) */
:root {
  --btn-radius: 8px;
  --btn-font:
    ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial,
    'Apple Color Emoji', 'Segoe UI Emoji';
  --btn-focus-ring: 0 0 0 3px rgba(0, 115, 230, 0.35);

  /* Colors */
  --btn-primary-bg: #0d6efd;
  --btn-primary-fg: #ffffff;
  --btn-primary-hover: #0b5ed7;

  --btn-secondary-bg: #e9ecef;
  --btn-secondary-fg: #212529;
  --btn-secondary-hover: #dfe3e6;

  --btn-success-bg: #198754;
  --btn-success-fg: #ffffff;
  --btn-success-hover: #157347;

  --btn-danger-bg: #dc3545;
  --btn-danger-fg: #ffffff;
  --btn-danger-hover: #bb2d3b;

  --btn-text-fg: #0d6efd;
  --btn-text-hover-bg: rgba(13, 110, 253, 0.08);
}

/* Base */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: var(--btn-radius);
  background: transparent;
  color: inherit;
  font-family: var(--btn-font);
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  transition:
    background-color 120ms ease,
    color 120ms ease,
    transform 80ms ease;
}

.btn:focus-visible {
  outline: none;
  box-shadow: var(--btn-focus-ring);
}

/* Sizes */
.btn--sm {
  padding: 0.4rem 0.7rem;
  font-size: 0.85rem;
}
.btn--md {
  padding: 0.55rem 0.9rem;
  font-size: 0.95rem;
}
.btn--lg {
  padding: 0.75rem 1.1rem;
  font-size: 1.05rem;
}

.btn--block {
  display: flex;
  width: 100%;
}

/* Variants */
.btn--primary {
  background: var(--btn-primary-bg);
  color: var(--btn-primary-fg);
}
.btn--primary:hover {
  background: var(--btn-primary-hover);
}

.btn--secondary {
  background: var(--btn-secondary-bg);
  color: var(--btn-secondary-fg);
}
.btn--secondary:hover {
  background: var(--btn-secondary-hover);
}

.btn--success {
  background: var(--btn-success-bg);
  color: var(--btn-success-fg);
}
.btn--success:hover {
  background: var(--btn-success-hover);
}

.btn--danger {
  background: var(--btn-danger-bg);
  color: var(--btn-danger-fg);
}
.btn--danger:hover {
  background: var(--btn-danger-hover);
}

/* Text-only (link-styled) */
.btn--text {
  background: transparent;
  color: var(--btn-text-fg);
}
.btn--text:hover {
  background: var(--btn-text-hover-bg);
}

/* States */
.is-disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

/* Icon + label */
.btn__icon {
  display: inline-flex;
  align-items: center;
  font-size: 1em; /* inherit for scalable icons */
}
.btn__label {
  display: inline-flex;
  align-items: center;
}

/* Spinner */
.btn__spinner {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-right-color: transparent;
  animation: spin 600ms linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
