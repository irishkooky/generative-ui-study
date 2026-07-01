import { describe, expect, it } from "vite-plus/test";

import { createUiPlan, studyIntents } from "./generative-ui";

describe("createUiPlan", () => {
  it("すべての intent から描画可能な UI schema を返す", () => {
    for (const intent of studyIntents) {
      const plan = createUiPlan(intent);

      expect(plan.intent).toBe(intent);
      expect(plan.blocks.length).toBeGreaterThan(0);
      expect(plan.prompt.length).toBeGreaterThan(0);
    }
  });
});
