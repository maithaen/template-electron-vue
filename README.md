# Template Electron Vue

<div align="center">

![Electron](https://img.shields.io/badge/Electron-39.x-47848F?style=for-the-badge&logo=electron&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn-vue](https://img.shields.io/badge/shadcn--vue-New_York-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

A modern desktop application template built with **Electron + Vue 3 + TypeScript + shadcn-vue**

✨ **Features**: Sidebar Layout • Theme Toggle (Light/Dark/System) • Multi-language (EN/LO) • Beautiful UI Components

</div>

---

## 🚀 Quick Start

### Clone the Repository

```bash
# Clone from GitHub
git clone https://github.com/maithaen/template-electron-vue.git <project-name>

# Navigate to the project
cd <project-name>

# Install dependencies
pnpm install

# Start development
pnpm dev
```

---

## ✨ Features

- 🎨 **Modern UI** - Beautiful sidebar layout with smooth animations
- 🧩 **shadcn-vue Components** - Pre-configured with New York style components
- 🌓 **Theme Toggle** - Light, Dark, and System theme support with persistence
- 🌍 **Multi-language** - English and Lao language support using vue-i18n
- ⚡ **Fast Development** - Hot Module Replacement with electron-vite
- 📦 **Type Safety** - Full TypeScript support
- 🎯 **Pinia Store** - State management for theme and sidebar
- 💅 **Tailwind CSS 4** - Utility-first CSS framework with CSS variables

---

## 🛠️ Tech Stack

| Technology    | Version | Description                          |
| ------------- | ------- | ------------------------------------ |
| Electron      | 39.x    | Cross-platform desktop apps          |
| Vue.js        | 3.5.x   | Progressive JavaScript framework     |
| TypeScript    | 5.x     | Type-safe JavaScript                 |
| shadcn-vue    | Latest  | Beautiful UI components (New York)   |
| Tailwind CSS  | 4.x     | Utility-first CSS framework          |
| Reka UI       | 2.x     | Unstyled accessible components       |
| Pinia         | 3.x     | Vue state management                 |
| vue-i18n      | 11.x    | Internationalization                 |
| vue-router    | 4.x     | Vue router                           |
| Lucide Icons  | Latest  | Beautiful SVG icons                  |

---

## 🧩 shadcn-vue Components

This template comes pre-configured with **shadcn-vue** using the **New York** style. The following components are included:

### Installed Components

| Component        | Description                              |
| ---------------- | ---------------------------------------- |
| `Avatar`         | User profile images with fallback        |
| `Badge`          | Status indicators and labels             |
| `Button`         | Interactive buttons with variants        |
| `Dropdown Menu`  | Contextual menus with submenus           |
| `Input`          | Form input fields                        |
| `Tooltip`        | Hover-triggered informational overlays   |

### Adding New Components

To add more shadcn-vue components:

```bash
npx shadcn-vue@latest add <component-name>
```

For example:

```bash
npx shadcn-vue@latest add card
npx shadcn-vue@latest add dialog
npx shadcn-vue@latest add select
```

### Configuration

The shadcn-vue configuration is stored in `components.json`:

```json
{
  "style": "new-york",
  "typescript": true,
  "tailwind": {
    "css": "src/renderer/src/assets/main.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@renderer/components",
    "utils": "@renderer/lib/utils",
    "ui": "@renderer/components/ui"
  }
}
```

---

## 📁 Project Structure

```
src/
├── main/                  # Electron main process
├── preload/               # Preload scripts
└── renderer/
    └── src/
        ├── assets/        # CSS and static assets
        │   └── main.css   # Tailwind CSS with shadcn-vue theme
        ├── components/    # Vue components
        │   ├── layout/    # Layout components (Sidebar, Header, etc.)
        │   └── ui/        # shadcn-vue UI components
        │       ├── avatar/
        │       ├── badge/
        │       ├── button/
        │       ├── dropdown-menu/
        │       ├── input/
        │       └── tooltip/
        ├── i18n/          # Internationalization
        │   └── locales/   # Language files (en, lo)
        ├── lib/           # Utility functions
        │   └── utils.ts   # cn() helper for class merging
        ├── router/        # Vue Router configuration
        ├── stores/        # Pinia stores (theme, sidebar)
        └── views/         # Page views
```

---

## 🔧 Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

---

## 📜 Available Scripts

### Development

```bash
pnpm dev          # Start development server with HMR
```

### Build

```bash
# Build for specific platforms
pnpm build:win    # Windows
pnpm build:mac    # macOS
pnpm build:linux  # Linux
```

### Other Commands

```bash
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
pnpm typecheck    # TypeScript type checking
```

---

## 🌍 Adding New Languages

1. Create a new locale file in `src/renderer/src/i18n/locales/`
2. Import and register it in `src/renderer/src/i18n/index.ts`
3. Add the language option in `LanguageSelector.vue`

---

## 🎨 Theming

### CSS Variables

The theme is configured using CSS variables in `src/renderer/src/assets/main.css`. You can customize colors by modifying the HSL values:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  /* ... more variables */
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  /* ... dark mode overrides */
}
```

### Theme Persistence

The theme preference is automatically saved to localStorage and restored on app load via the Pinia theme store.

---

## 📄 License

MIT License - feel free to use this template for your projects!

---

<div align="center">

Made with ❤️ by [maithaen](https://github.com/maithaen)

</div>
