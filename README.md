# TanStack Start Starter

Minimal [TanStack Start](https://tanstack.com/start) template with TanStack Router and [Vite+](https://viteplus.dev/).

**Stack:** TanStack Start 1.x, React 19, Tailwind CSS 4, TypeScript, [@lightsound/cn](https://github.com/lightsound/cn).

## Prerequisites

[Vite+](https://viteplus.dev/guide/) on `PATH` as `vp`.

## Quick start

```bash
git clone https://github.com/lightsound/tanstack-start-start.git
cd tanstack-start-start
vp install
vp dev
```

Local dev includes [TanStack Router DevTools](https://tanstack.com/router/latest/docs/framework/react/devtools) (bottom-right panel).

## Commands

`vp help` lists built-ins. Day-to-day workflow and extras (`vp run knip`, `vp run doctor`): [AGENTS.md](AGENTS.md).

## Config & Git hooks

`vite.config.ts` bundles Vite, lint, fmt, and `staged`. Install hooks once with `vp config` ([commit hooks](https://viteplus.dev/guide/commit-hooks)); `vp staged` runs `vp check --fix` on staged files. CI: `vp check`, `vp test`, `vp build`.

## VS Code

[Oxc VS Code](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode); see `.vscode/settings.json`.

## License

[MIT](LICENSE.md).
