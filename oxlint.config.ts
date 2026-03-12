import { defineConfig } from "oxlint";

export default defineConfig({
  ignorePatterns: ["**/routeTree.gen.ts", "vite.config.ts"],
  plugins: ["react", "react-perf", "import", "jsx-a11y", "promise"],
  options: {
    typeAware: true,
    typeCheck: true,
    denyWarnings: true,
  },
  env: {
    node: true,
    browser: true,
  },
  categories: {
    correctness: "error",
  },
  rules: {
    "no-default-export": "error",
  },
  overrides: [
    {
      files: ["src/router.tsx", "vite.config.ts", "*.config.ts"],
      rules: {
        "no-default-export": "off",
      },
    },
  ],
});
