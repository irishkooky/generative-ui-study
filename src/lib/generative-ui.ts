export type StudyIntent = "dashboard" | "onboarding" | "timeline";

export type UiBlock =
  | {
      body: string;
      kind: "hero";
      metric: string;
      title: string;
    }
  | {
      items: Array<{ label: string; value: string }>;
      kind: "stats";
    }
  | {
      fields: Array<{ label: string; placeholder: string; type: "text" | "email" }>;
      kind: "form";
      title: string;
    }
  | {
      kind: "steps";
      steps: Array<{ description: string; label: string; state: "done" | "next" | "later" }>;
      title: string;
    };

export type UiPlan = {
  blocks: Array<UiBlock>;
  description: string;
  intent: StudyIntent;
  principle: string;
  prompt: string;
  title: string;
};

const plans = {
  dashboard: {
    blocks: [
      {
        body: "学習者の入力を、要約・次アクション・進捗の 3 つに分解して表示します。",
        kind: "hero",
        metric: "3 views",
        title: "Study command center",
      },
      {
        items: [
          { label: "完了レッスン", value: "12" },
          { label: "復習待ち", value: "4" },
          { label: "UI パターン", value: "8" },
        ],
        kind: "stats",
      },
      {
        kind: "steps",
        steps: [
          { description: "ユーザーの目的を分類する", label: "Intent", state: "done" },
          { description: "表示すべき情報単位を選ぶ", label: "Schema", state: "next" },
          { description: "React コンポーネントで描画する", label: "Renderer", state: "later" },
        ],
        title: "生成パイプライン",
      },
    ],
    description: "大量の状態を俯瞰したいユーザーには、カードとステップで判断材料を並べる。",
    intent: "dashboard",
    principle: "Generative UI はテキストを返すだけでなく、目的に合う情報構造を返す。",
    prompt: "学習進捗を見ながら次にやることを決めたい",
    title: "進捗ダッシュボード",
  },
  onboarding: {
    blocks: [
      {
        body: "最初の入力を短くし、AI が後続のフォームや説明を組み立てる体験を試します。",
        kind: "hero",
        metric: "5 min",
        title: "Adaptive onboarding",
      },
      {
        fields: [
          { label: "学びたいテーマ", placeholder: "例: tool calling と UI schema", type: "text" },
          { label: "通知先", placeholder: "you@example.com", type: "email" },
        ],
        kind: "form",
        title: "最初の学習コンテキスト",
      },
      {
        kind: "steps",
        steps: [
          { description: "ゴールと制約を聞く", label: "Ask", state: "done" },
          { description: "必要な UI を増やす", label: "Adapt", state: "next" },
          { description: "保存と再開を可能にする", label: "Persist", state: "later" },
        ],
        title: "オンボーディング設計",
      },
    ],
    description: "ユーザーに全部を聞かず、回答に応じてフォーム自体を変える。",
    intent: "onboarding",
    principle: "生成される UI は会話の結果であり、次の入力を楽にするための道具でもある。",
    prompt: "初心者向けの Generative UI 学習プランを作りたい",
    title: "適応型オンボーディング",
  },
  timeline: {
    blocks: [
      {
        body: "抽象的な学習テーマを、検証可能な小さなマイルストーンに変換します。",
        kind: "hero",
        metric: "4 weeks",
        title: "Learning roadmap",
      },
      {
        kind: "steps",
        steps: [
          { description: "UI schema を手で書いて renderer に渡す", label: "Week 1", state: "done" },
          { description: "LLM の JSON 出力を検証して表示する", label: "Week 2", state: "next" },
          { description: "Cloudflare Workers で edge 実行する", label: "Week 3", state: "later" },
          { description: "失敗時の fallback UI を設計する", label: "Week 4", state: "later" },
        ],
        title: "ロードマップ",
      },
      {
        items: [
          { label: "Schema", value: "typed" },
          { label: "Renderer", value: "React" },
          { label: "Runtime", value: "Workers" },
        ],
        kind: "stats",
      },
    ],
    description: "曖昧な目標を、時間軸と成果物に分けて学習しやすくする。",
    intent: "timeline",
    principle: "UI の生成結果は、ユーザーが次に取る行動を明確にするほど価値が高い。",
    prompt: "4 週間で Generative UI を実装できるようになりたい",
    title: "学習ロードマップ",
  },
} satisfies Record<StudyIntent, UiPlan>;

export function createUiPlan(intent: StudyIntent): UiPlan {
  return plans[intent];
}

export const studyIntents = Object.keys(plans) as Array<StudyIntent>;
