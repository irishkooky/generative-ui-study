import { createFileRoute } from "@tanstack/react-router";
import { cn } from "cnfast";
import { useState } from "react";

import {
  getScenario,
  scenarioIds,
  type ChatMessage,
  type ComponentSpec,
  type Scenario,
  type ScenarioId,
  type UiSurface,
} from "../lib/generative-ui";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("mcp-apps");
  const [actionResult, setActionResult] = useState(
    "まだ UI からの tool call は実行されていません。",
  );
  const [todoText, setTodoText] = useState("SpeakerDeck の内容を README に反映する");
  const scenario = getScenario(scenarioId);

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-[#111827]">
      <section className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-6 px-4 py-5 md:grid-cols-[300px_1fr] md:px-7">
        <aside className="grid content-between gap-6 border-b border-[#d6dce8] pb-5 md:border-r md:border-b-0 md:pr-6 md:pb-0">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-black tracking-[0.16em] text-[#006d77] uppercase">
                Frontend x AI
              </p>
              <h1 className="text-4xl leading-none font-black sm:text-5xl">Generative UI Study</h1>
              <p className="text-sm leading-6 text-[#4b5563]">
                テキスト応答だけでは足りない瞬間に、会話の中へ操作可能な UI
                を差し込む設計を学ぶラボです。
              </p>
            </div>

            <nav aria-label="Scenario">
              <p className="mb-2 text-sm font-black text-[#374151]">Scenario</p>
              <menu className="grid gap-2">
                {scenarioIds.map((id) => {
                  const item = getScenario(id);
                  return (
                    <li key={id}>
                      <button
                        className={cn(
                          "grid w-full gap-1 rounded-md border px-3 py-3 text-left transition",
                          id === scenarioId
                            ? "border-[#111827] bg-[#111827] text-white"
                            : "border-[#c9d2df] bg-white text-[#111827] hover:border-[#006d77]",
                        )}
                        onClick={() => {
                          setScenarioId(id);
                          setActionResult("まだ UI からの tool call は実行されていません。");
                        }}
                        type="button"
                      >
                        <span className="text-sm font-black">{scenarioLabel[id]}</span>
                        <span
                          className={cn(
                            "text-xs",
                            id === scenarioId ? "text-[#d1f7ff]" : "text-[#6b7280]",
                          )}
                        >
                          {item.angle === "producer" ? "AI as producer" : "AI as consumer"}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </menu>
            </nav>
          </div>

          <div className="grid gap-2 text-sm text-[#4b5563]">
            <p className="font-black text-[#111827]">Agent-readable paths</p>
            <code>/llms.txt</code>
            <code>/llms-full.txt</code>
          </div>
        </aside>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="grid gap-4">
            <header className="grid gap-3 rounded-md border border-[#c9d2df] bg-white px-5 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-[#006d77]">Current model</p>
                  <h2 className="text-2xl font-black">{scenario.title}</h2>
                </div>
                <span className="rounded-full bg-[#ffddd2] px-3 py-1 text-sm font-black text-[#8a2d1c]">
                  {scenario.angle}
                </span>
              </div>
              <p className="max-w-3xl text-sm leading-6 text-[#4b5563]">{scenario.description}</p>
            </header>

            <section
              aria-label="Chat transcript"
              className="grid gap-3 rounded-md border border-[#c9d2df] bg-[#edf2f7] p-4"
            >
              {scenario.chat.map((message, index) => (
                <ChatBubble
                  actionResult={actionResult}
                  key={`${message.kind}-${index}`}
                  message={message}
                  scenario={scenario}
                  setActionResult={setActionResult}
                  setTodoText={setTodoText}
                  todoText={todoText}
                />
              ))}
            </section>
          </section>

          <aside className="grid content-start gap-4">
            <section className="rounded-md border border-[#c9d2df] bg-white p-4">
              <p className="text-sm font-black text-[#006d77]">What to notice</p>
              <ul className="mt-3 grid gap-3">
                {scenario.learningPoints.map((point) => (
                  <li
                    className="grid grid-cols-[18px_1fr] gap-2 text-sm leading-6 text-[#374151]"
                    key={point}
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#00afb9]" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-md border border-[#111827] bg-[#111827] p-4 text-white">
              <p className="text-sm font-black text-[#83c5be]">Protocol sketch</p>
              <pre className="mt-3 max-h-[420px] overflow-auto rounded-md bg-black/30 p-3 text-xs leading-6 text-[#eef6ff]">
                {scenario.code}
              </pre>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

const scenarioLabel = {
  "mcp-apps": "MCP Apps",
  a2ui: "A2UI / json-render",
  webmcp: "WebMCP",
} satisfies Record<ScenarioId, string>;

function ChatBubble({
  actionResult,
  message,
  scenario,
  setActionResult,
  setTodoText,
  todoText,
}: {
  actionResult: string;
  message: ChatMessage;
  scenario: Scenario;
  setActionResult: (value: string) => void;
  setTodoText: (value: string) => void;
  todoText: string;
}) {
  const isUser = message.role === "user";

  return (
    <article className={cn("grid max-w-[860px] gap-3", isUser && "justify-self-end")}>
      <div
        className={cn(
          "rounded-md px-4 py-3 text-sm leading-6",
          isUser ? "bg-[#006d77] text-white" : "border border-[#c9d2df] bg-white text-[#1f2937]",
        )}
      >
        <p className="mb-1 text-xs font-black uppercase opacity-70">{message.role}</p>
        <p>{message.text}</p>
      </div>

      {message.kind === "surface" ? (
        <GeneratedSurface
          actionResult={actionResult}
          scenario={scenario}
          setActionResult={setActionResult}
          setTodoText={setTodoText}
          todoText={todoText}
        />
      ) : null}
    </article>
  );
}

function GeneratedSurface({
  actionResult,
  scenario,
  setActionResult,
  setTodoText,
  todoText,
}: {
  actionResult: string;
  scenario: Scenario;
  setActionResult: (value: string) => void;
  setTodoText: (value: string) => void;
  todoText: string;
}) {
  if (scenario.tools) {
    return (
      <section className="rounded-md border border-[#83c5be] bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d6dce8] pb-3">
          <div>
            <p className="text-xs font-black text-[#006d77]">WebMCP tool surface</p>
            <h3 className="text-lg font-black">共有 UI に意味のある操作点を置く</h3>
          </div>
          <span className="rounded-full bg-[#e0fbfc] px-3 py-1 text-xs font-black text-[#006d77]">
            human-in-the-loop
          </span>
        </div>

        <div
          className="mt-4 grid gap-3"
          data-tool-description="Add a new todo item to the list"
          data-tool-name="add-todo-item"
        >
          <label className="grid gap-2 text-sm font-bold">
            Task text
            <input
              className="h-11 rounded-md border border-[#c9d2df] px-3 font-normal outline-none focus:border-[#006d77]"
              name="text"
              onChange={(event) => setTodoText(event.target.value)}
              required
              value={todoText}
            />
          </label>
          <button
            className="h-11 rounded-md bg-[#111827] px-4 text-sm font-black text-white"
            onClick={() => setActionResult(`tool:add-todo -> Added todo: ${todoText}`)}
            type="button"
          >
            Confirm tool execution
          </button>
        </div>

        <div aria-live="polite" className="mt-4 rounded-md bg-[#f5f7fb] p-3 text-sm text-[#374151]">
          {actionResult}
        </div>

        <div className="mt-4 grid gap-2">
          {scenario.tools.map((tool) => (
            <div className="rounded-md border border-[#d6dce8] p-3" key={tool.name}>
              <p className="font-black">{tool.title}</p>
              <p className="text-sm leading-6 text-[#4b5563]">{tool.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!scenario.surface) {
    return null;
  }

  return (
    <section className="rounded-md border border-[#83c5be] bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black text-[#006d77]">Generated UI surface</p>
          <h3 className="text-lg font-black">チャット内で操作する</h3>
        </div>
        <span className="rounded-full bg-[#e0fbfc] px-3 py-1 text-xs font-black text-[#006d77]">
          {scenario.surface.surfaceId}
        </span>
      </div>
      <SurfaceRenderer
        onAction={(actionName) =>
          setActionResult(`app.callServerTool("${actionName}") -> reservation held`)
        }
        surface={scenario.surface}
      />
      <div aria-live="polite" className="mt-4 rounded-md bg-[#f5f7fb] p-3 text-sm text-[#374151]">
        {actionResult}
      </div>
    </section>
  );
}

function SurfaceRenderer({
  onAction,
  surface,
}: {
  onAction: (actionName: string) => void;
  surface: UiSurface;
}) {
  return <ComponentNode components={surface.components} id={surface.root} onAction={onAction} />;
}

function ComponentNode({
  components,
  id,
  onAction,
}: {
  components: Array<ComponentSpec>;
  id: string;
  onAction: (actionName: string) => void;
}) {
  const component = components.find((item) => item.id === id);

  if (!component) {
    return null;
  }

  if (component.component === "Card") {
    return (
      <article className="rounded-md border border-[#d6dce8] bg-[#f8fafc] p-4">
        <h4 className="text-xl font-black">{component.props?.title}</h4>
        <div className="mt-4 grid gap-3">
          {component.children?.map((childId) => (
            <ComponentNode components={components} id={childId} key={childId} onAction={onAction} />
          ))}
        </div>
      </article>
    );
  }

  if (component.component === "Column") {
    return (
      <div className="grid gap-3">
        {component.children?.map((childId) => (
          <ComponentNode components={components} id={childId} key={childId} onAction={onAction} />
        ))}
      </div>
    );
  }

  if (component.component === "Metric") {
    return (
      <div className="grid grid-cols-[1fr_auto] items-center rounded-md bg-white p-3">
        <p className="text-sm text-[#4b5563]">{component.props?.label}</p>
        <p className="text-lg font-black">{component.props?.value}</p>
      </div>
    );
  }

  if (component.component === "Button") {
    return (
      <button
        className="h-11 rounded-md bg-[#ff7d5c] px-4 text-sm font-black text-[#111827]"
        onClick={() => onAction(component.action?.name ?? "unknown_action")}
        type="button"
      >
        {component.props?.label}
      </button>
    );
  }

  return (
    <p
      className={cn(
        "text-sm leading-6 text-[#374151]",
        component.props?.tone === "strong" && "text-lg font-black",
      )}
    >
      {component.text}
    </p>
  );
}
