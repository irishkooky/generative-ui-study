# TanStack Start Starter

A minimal starter template for [TanStack Start](https://tanstack.com/start), powered by TanStack Router and migrated to [Vite+](https://viteplus.dev/).

## Tech Stack

| Category  | Technology                                                                             | Version   |
| --------- | -------------------------------------------------------------------------------------- | --------- |
| Framework | [TanStack Start](https://tanstack.com/start)                                           | Latest    |
| Toolchain | [Vite+](https://viteplus.dev/)                                                         | Latest    |
| Styling   | [Tailwind CSS](https://tailwindcss.com/)                                               | 4         |
| Language  | [TypeScript Native](https://devblogs.microsoft.com/typescript/typescript-native-port/) | 7 Preview |
| Git Hooks | [Vite+ commit hooks](https://viteplus.dev/guide/commit-hooks)                          | Latest    |
| Utility   | [@lightsound/cn](https://github.com/lightsound/cn)                                     | Latest    |

## Getting Started

### Prerequisites

- [Vite+](https://viteplus.dev/guide/) installed globally so `vp` is available

### Installation

```bash
# Clone the repository
git clone https://github.com/lightsound/tanstack-start-start.git
cd tanstack-start-start

# Install dependencies
vp install

# Start development server
vp dev
```

## Common Commands

| Command      | Description                         |
| ------------ | ----------------------------------- |
| `vp install` | Install dependencies                |
| `vp dev`     | Start development server            |
| `vp build`   | Build for production                |
| `vp preview` | Preview the production build        |
| `vp check`   | Run formatting, linting, type-check |
| `vp lint`    | Run linting only                    |
| `vp fmt`     | Format source files                 |
| `vp test`    | Run tests                           |

## Configuration

Vite+, linting, and formatting are configured in `vite.config.ts`:

- `lint` contains the Oxlint-compatible rules, plugins, ignores, and type-aware options
- `fmt` contains Oxfmt-compatible formatting behavior such as import sorting and Tailwind class sorting
- `staged` defines pre-commit checks for staged files through `vp staged`
- Vite app configuration remains in the same `defineConfig()` call alongside those blocks

## VS Code Configuration

This project recommends the [oxc extension](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode) for formatting and linting support in the editor.

The included `.vscode/settings.json` configures:

- format on save through the Oxc extension
- `pnpm-lock.yaml`, generated route files, and Markdown files as read-only
- Prettier, Biome, and ESLint disabled to avoid overlapping tooling

## About @lightsound/cn

[@lightsound/cn](https://github.com/lightsound/cn) is a lightweight `className` utility. This starter also includes `tailwind-merge`, so you can switch to Tailwind Merge-aware `cn` by changing the import path:

```tsx
import { cn } from "@lightsound/cn";
import { cn as twMergeCn } from "@lightsound/cn/tw-merge";
```

## Git Hooks with Vite+

This starter uses [Vite+ commit hooks](https://viteplus.dev/guide/commit-hooks):

- Run `vp config` once for this clone to install the local Git hooks
- `vp staged` runs `vp check --fix` for staged `js`, `jsx`, `ts`, `tsx`, `json`, and `css` files
- If you add CI later, use `vp check`, `vp test`, and `vp build` as the default validation steps

## Developer Tools

In development mode, this starter includes [TanStack Router DevTools](https://tanstack.com/router/latest/docs/framework/react/devtools) for debugging routes and navigation. The DevTools panel appears in the bottom-right corner of your application.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE.md) for details.
