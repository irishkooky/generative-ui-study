export type ScenarioId = "mcp-apps" | "a2ui" | "webmcp";

export type ChatMessage =
  | {
      kind: "text";
      role: "assistant" | "user";
      text: string;
    }
  | {
      kind: "surface";
      role: "assistant";
      surfaceId: string;
      text: string;
    };

export type ComponentSpec = {
  action?: { name: string };
  children?: Array<string>;
  component: "Button" | "Card" | "Column" | "Metric" | "Text";
  id: string;
  props?: Record<string, string>;
  text?: string;
};

export type UiSurface = {
  components: Array<ComponentSpec>;
  root: string;
  surfaceId: string;
};

export type ToolSpec = {
  description: string;
  inputSchema: Record<string, unknown>;
  name: string;
  title: string;
};

export type Scenario = {
  angle: "producer" | "consumer";
  chat: Array<ChatMessage>;
  code: string;
  description: string;
  id: ScenarioId;
  learningPoints: Array<string>;
  surface?: UiSurface;
  title: string;
  tools?: Array<ToolSpec>;
};

const reservationSurface: UiSurface = {
  components: [
    {
      children: ["heading", "copy", "party", "time", "reserve"],
      component: "Card",
      id: "root",
      props: { title: "Book a table" },
    },
    {
      component: "Text",
      id: "heading",
      props: { tone: "strong" },
      text: "NAGOYA Bistro",
    },
    {
      component: "Text",
      id: "copy",
      text: "会話から離れずに、候補確認と予約操作まで進められる UI surface。",
    },
    {
      component: "Metric",
      id: "party",
      props: { label: "Party", value: "2 people" },
    },
    {
      component: "Metric",
      id: "time",
      props: { label: "Available", value: "19:30" },
    },
    {
      action: { name: "submit_reservation" },
      component: "Button",
      id: "reserve",
      props: { label: "Reserve" },
    },
  ],
  root: "root",
  surfaceId: "reservation",
} satisfies UiSurface;

const scenarios = {
  "mcp-apps": {
    angle: "producer",
    chat: [
      { kind: "text", role: "user", text: "名古屋で今夜 2 人で入れる店を探して予約したい" },
      {
        kind: "text",
        role: "assistant",
        text: "候補を比較して決める場面なので、文章だけではなくカード UI を差し込みます。",
      },
      {
        kind: "surface",
        role: "assistant",
        surfaceId: "reservation",
        text: "MCP Apps では tool response に紐づく UI resource をチャット内に埋め込みます。",
      },
    ],
    code: `registerAppResource(server, "ui:/reservation", "Reservation Surface", {
  mimeType: RESOURCE_MIME_TYPE,
  _meta: { ui: { csp: { connectDomains: ["https://api.example.com"] } } },
});

server.tool("show_reservation", {
  description: "予約候補を UI で表示する",
  _meta: { ui: { resourceUri: "ui:/reservation" } },
});`,
    description:
      "AI がテキストの代わりに、必要な瞬間だけ操作可能な UI resource を返す考え方を学ぶ。",
    id: "mcp-apps",
    learningPoints: [
      "UI は入口のページではなく、会話中に差し込まれる部品になる",
      "iframe sandbox と CSP で、表現力と安全性の境界を作る",
      "ホストの CSS 変数を使うと、ChatGPT/Claude などの文脈に馴染む",
    ],
    surface: reservationSurface,
    title: "MCP Apps: interactive UI in chat",
  },
  a2ui: {
    angle: "producer",
    chat: [
      {
        kind: "text",
        role: "user",
        text: "予約 UI を生成して。完成 JSON を待たずに少しずつ表示したい",
      },
      {
        kind: "text",
        role: "assistant",
        text: "A2UI 風に、フラットな component messages を surface に流し込みます。",
      },
      {
        kind: "surface",
        role: "assistant",
        surfaceId: "reservation",
        text: "生成されるのは HTML ではなく、ホストが安全に描画できる component spec です。",
      },
    ],
    code: `{"version":"v0.9","createSurface":{"surfaceId":"reservation","catalogId":"basic"}}
{"version":"v0.9","updateComponents":{
  "surfaceId":"reservation",
  "components":[
    {"id":"root","component":"Column","children":["heading","reserve"]},
    {"id":"heading","component":"Text","text":"Book Your Table"},
    {"id":"reserve","component":"Button","label":"Reserve","action":{"name":"submit_reservation"}}
  ]
}}`,
    description:
      "LLM が HTML ではなく宣言的 JSON を返し、ホストがネイティブ部品として描画する流れを学ぶ。",
    id: "a2ui",
    learningPoints: [
      "LLM がインクリメンタルに生成しやすいよう、component spec はフラットに保つ",
      "開発者は catalog と renderer を用意し、AI の出力を制約する",
      "json-render のように schema-agnostic な renderer へ発展できる",
    ],
    surface: reservationSurface,
    title: "A2UI/json-render: declarative component spec",
  },
  webmcp: {
    angle: "consumer",
    chat: [
      { kind: "text", role: "user", text: "この TODO アプリを AI と一緒に操作できるようにしたい" },
      {
        kind: "text",
        role: "assistant",
        text: "AI が DOM を無理に操作するのではなく、意味を持った tool を Web アプリ側から公開します。",
      },
      {
        kind: "surface",
        role: "assistant",
        surfaceId: "tool-panel",
        text: "human-in-the-loop 前提で、値の入力までは AI、実行確認は人間が担う設計にします。",
      },
    ],
    code: `window.navigator.modelContext.registerTool({
  name: "add-todo",
  title: "Add todo",
  description: "Add a new todo item to the list",
  inputSchema: { type: "object", properties: { text: { type: "string" } } },
  execute: async ({ text }) => addTask(text),
});`,
    description: "AI が Web の消費者にもなった前提で、人間と AI が同じ UI を共有する設計を学ぶ。",
    id: "webmcp",
    learningPoints: [
      "AI エージェント向けの操作点はアクセシビリティと地続き",
      "スクリーンショットや DOM 推測より、意味のある関数を公開する",
      "Markdown/llms.txt で読むための入口も用意するとコンテキスト効率が上がる",
    ],
    title: "WebMCP: web app as tools for agents",
    tools: [
      {
        description: "Add a task after the human confirms the submitted form.",
        inputSchema: {
          properties: { text: { type: "string" } },
          required: ["text"],
          type: "object",
        },
        name: "add-todo",
        title: "Add todo",
      },
      {
        description: "Summarize current tasks without reading decorative UI.",
        inputSchema: { properties: {}, type: "object" },
        name: "summarize-todos",
        title: "Summarize todos",
      },
    ],
  },
} satisfies Record<ScenarioId, Scenario>;

export function getScenario(id: ScenarioId): Scenario {
  return scenarios[id];
}

export const scenarioIds = Object.keys(scenarios) as Array<ScenarioId>;
