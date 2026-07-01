import { describe, expect, it } from "vite-plus/test";

import { getScenario, scenarioIds } from "./generative-ui";

describe("getScenario", () => {
  it("すべての scenario が会話中に UI surface か tool を差し込む", () => {
    for (const id of scenarioIds) {
      const scenario = getScenario(id);

      expect(scenario.chat.some((message) => message.kind === "surface")).toBe(true);
      expect(scenario.learningPoints.length).toBeGreaterThan(0);
      expect(scenario.surface ?? scenario.tools).toBeTruthy();
    }
  });

  it("A2UI scenario はフラットな component spec と root を持つ", () => {
    const scenario = getScenario("a2ui");

    expect(scenario.surface?.root).toBe("root");
    expect(scenario.surface?.components.every((component) => component.id.length > 0)).toBe(true);
  });
});
