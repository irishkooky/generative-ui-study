import { defineConfig } from "oxfmt";

export default defineConfig({
  ignorePatterns: ["**/routeTree.gen.ts"],
  sortImports: {
    partitionByComment: true,
  },
  sortTailwindcss: {
    functions: ["cn"],
  },
  sortPackageJson: {
    sortScripts: true,
  },
});
