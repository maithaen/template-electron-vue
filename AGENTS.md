# AGENTS.md - AI Agent Instructions

This file provides structured information for AI agents working on this codebase.

---

## Project Overview

| Field         | Value                                                |
| ------------- | ---------------------------------------------------- |
| **Name**      | Template Electron Vue                                |
| **Type**      | Desktop Application Template                         |
| **Framework** | Electron 39.x + Vue 3.5.x + TypeScript 5.x           |
| **Styling**   | Tailwind CSS 4.x + shadcn-vue (New York style)       |
| **Package**   | pnpm                                                 |

---

## Architecture

### Process Model

| Process    | Directory       | Purpose                              |
| ---------- | --------------- | ------------------------------------ |
| **Main**   | `src/main/`     | Electron main process (Node.js)      |
| **Preload**| `src/preload/`  | Bridge between main and renderer     |
| **Renderer**| `src/renderer/` | Vue.js frontend (browser context)   |

### Key Directories

```
src/
├── main/                      # Electron main process
│   └── index.ts               # Main entry point
├── preload/                   # Preload scripts
│   ├── index.ts               # Preload entry
│   └── index.d.ts             # Type declarations
└── renderer/
    └── src/
        ├── App.vue            # Root Vue component
        ├── main.ts            # Vue entry point
        ├── assets/            # Static assets & CSS
        │   └── main.css       # Tailwind + shadcn-vue theme
        ├── components/        # Vue components
        │   ├── layout/        # Layout: Sidebar, Header
        │   └── ui/            # shadcn-vue components
        ├── i18n/              # Internationalization
        │   └── locales/       # Language files (en, lo)
        ├── lib/               # Utilities
        │   └── utils.ts       # cn() class helper
        ├── router/            # Vue Router
        │   └── index.ts       # Route definitions
        ├── stores/            # Pinia stores
        │   ├── theme.ts       # Theme management
        │   └── sidebar.ts     # Sidebar state
        └── views/             # Page components
```

---

## Technology Stack

### Core Dependencies

| Package                    | Purpose                           |
| -------------------------- | --------------------------------- |
| `electron`                 | Desktop app framework             |
| `vue`                      | UI framework                      |
| `typescript`               | Type safety                       |
| `tailwindcss`              | Utility-first CSS                 |
| `reka-ui`                  | Unstyled accessible components    |
| `class-variance-authority` | Component variant styling         |
| `clsx` + `tailwind-merge`  | Class name utilities              |
| `lucide-vue-next`          | Icon library                      |
| `pinia`                    | State management                  |
| `vue-router`               | Routing                           |
| `vue-i18n`                 | Internationalization              |
| `@vueuse/core`             | Vue composition utilities         |

---

## shadcn-vue Configuration

### Config File: `components.json`

```json
{
  "style": "new-york",
  "typescript": true,
  "tailwind": {
    "css": "src/renderer/src/assets/main.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide"
}
```

### Path Aliases

| Alias           | Path                           |
| --------------- | ------------------------------ |
| `@renderer`     | `src/renderer/src`             |
| `@renderer/lib` | `src/renderer/src/lib`         |
| `@renderer/components` | `src/renderer/src/components` |
| `@renderer/components/ui` | `src/renderer/src/components/ui` |

### Installed Components

| Component        | Path                                    |
| ---------------- | --------------------------------------- |
| Avatar           | `components/ui/avatar/`                 |
| Badge            | `components/ui/badge/`                  |
| Button           | `components/ui/button/`                 |
| Dropdown Menu    | `components/ui/dropdown-menu/`          |
| Input            | `components/ui/input/`                  |
| Tooltip          | `components/ui/tooltip/`                |

### Adding New Components

```bash
npx shadcn-vue@latest add <component-name>
```

---

## Development Commands

| Command          | Purpose                          |
| ---------------- | -------------------------------- |
| `pnpm install`   | Install dependencies             |
| `pnpm dev`       | Start dev server with HMR        |
| `pnpm build:win` | Build for Windows                |
| `pnpm build:mac` | Build for macOS                  |
| `pnpm build:linux` | Build for Linux                |
| `pnpm lint`      | Run ESLint                       |
| `pnpm format`    | Format with Prettier             |
| `pnpm typecheck` | TypeScript type checking         |

---

## Code Patterns

### Component Structure

Vue components follow the Composition API with `<script setup>`:

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@renderer/components/ui/button'

const props = defineProps<{
  title: string
}>()

const count = ref(0)
</script>

<template>
  <div>
    <h1>{{ props.title }}</h1>
    <Button @click="count++">{{ count }}</Button>
  </div>
</template>
```

### Styling with cn() Utility

Use the `cn()` helper for conditional class merging:

```ts
import { cn } from '@renderer/lib/utils'

const classes = cn(
  'base-class',
  isActive && 'active-class',
  variant === 'primary' && 'primary-class'
)
```

### Theme-Aware Styling

Use CSS variables for theme compatibility:

```css
.my-component {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
}
```

### Pinia Store Pattern

```ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMyStore = defineStore('my-store', () => {
  const value = ref('')

  function setValue(newValue: string) {
    value.value = newValue
  }

  return { value, setValue }
})
```

---

## IPC Communication

### Pattern: Main ↔ Renderer

1. **Main Process** (`src/main/`): Register handlers with `ipcMain.handle()`
2. **Preload** (`src/preload/`): Expose APIs via `contextBridge.exposeInMainWorld()`
3. **Renderer** (`src/renderer/`): Call via `window.api.methodName()`

### Type Safety

- Define types in `src/preload/index.d.ts`
- Export types for use in renderer

---

## Theming

### CSS Variables Location

`src/renderer/src/assets/main.css`

### Variable Naming Convention

```css
--background          /* Main background */
--foreground          /* Main text color */
--primary             /* Primary action color */
--primary-foreground  /* Text on primary */
--secondary           /* Secondary surfaces */
--muted               /* Subdued backgrounds */
--accent              /* Accent highlights */
--destructive         /* Error/danger states */
--border              /* Border color */
--ring                /* Focus ring color */
```

### Theme Toggle

Theme state managed by `src/renderer/src/stores/theme.ts`

Supported themes: `light`, `dark`, `system`

---

## Internationalization

### Config Location

`src/renderer/src/i18n/index.ts`

### Locale Files

- `src/renderer/src/i18n/locales/en.ts` - English
- `src/renderer/src/i18n/locales/lo.ts` - Lao

### Usage Pattern

```vue
<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <p>{{ t('greeting') }}</p>
</template>
```

---

## File Conventions

| Type              | Location                          | Naming              |
| ----------------- | --------------------------------- | ------------------- |
| Pages/Views       | `renderer/src/views/`             | `*View.vue`         |
| Layout Components | `renderer/src/components/layout/` | `App*.vue`          |
| UI Components     | `renderer/src/components/ui/`     | `*.vue`             |
| Stores            | `renderer/src/stores/`            | `*.ts`              |
| Composables       | `renderer/src/composables/`       | `use*.ts`           |
| Types             | `src/main/types.ts`, `preload/index.d.ts` | `*.ts`      |

---

## Important Notes

1. **Always use TypeScript** - Strict typing is enabled
2. **Use shadcn-vue components** - Prefer UI components over custom HTML
3. **Follow Tailwind CSS** - Use utility classes, avoid inline styles
4. **Theme compatibility** - Use CSS variables (hsl format) for colors
5. **Path aliases** - Use `@renderer/` for renderer imports
6. **Composition API** - Use `<script setup>` syntax
7. **Pinia for state** - Use stores for shared state

---

## Quick Reference

### Import Patterns

```ts
// shadcn-vue components
import { Button } from '@renderer/components/ui/button'
import { Badge } from '@renderer/components/ui/badge'

// Icons
import { Home, Settings, User } from 'lucide-vue-next'

// Utilities
import { cn } from '@renderer/lib/utils'

// Store
import { useThemeStore } from '@renderer/stores/theme'

// i18n
import { useI18n } from 'vue-i18n'
```

### Color Palette (CSS Variables)

| Variable         | Light Mode       | Dark Mode        |
| ---------------- | ---------------- | ---------------- |
| `--background`   | White (0 0% 100%)| Near black       |
| `--foreground`   | Near black       | Near white       |
| `--primary`      | Neutral dark     | Neutral light    |
| `--muted`        | Gray 100         | Gray 800         |
| `--border`       | Gray 200         | Gray 800         |
