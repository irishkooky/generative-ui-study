import { createFileRoute } from "@tanstack/react-router";
import { cn } from "cnfast";
import { useState } from "react";

import { createUiPlan, studyIntents, type StudyIntent, type UiBlock } from "../lib/generative-ui";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [intent, setIntent] = useState<StudyIntent>("dashboard");
  const plan = createUiPlan(intent);

  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#171717]">
      <section className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-8 px-5 py-8 md:grid-cols-[360px_1fr] md:px-8 lg:gap-12">
        <aside className="flex flex-col justify-between gap-8 border-b border-[#171717]/15 pb-6 md:border-r md:border-b-0 md:pr-8 md:pb-0">
          <div className="space-y-7">
            <div className="space-y-3">
              <p className="text-sm font-semibold tracking-[0.14em] text-[#7a3f2b] uppercase">
                TanStack Start Lab
              </p>
              <h1 className="max-w-[12ch] text-5xl leading-[0.95] font-black sm:text-6xl">
                Generative UI Study
              </h1>
              <p className="max-w-sm text-base leading-7 text-[#4d4840]">
                intent を UI schema に変換し、React renderer で画面を組み立てる流れを学ぶための
                Cloudflare Workers 対応プロジェクトです。
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-[#4d4840]">Intent preset</p>
              <menu className="grid gap-2">
                {studyIntents.map((item) => (
                  <li key={item}>
                    <button
                      className={cn(
                        "flex w-full items-center justify-between rounded-md border px-4 py-3 text-left text-sm font-semibold transition",
                        item === intent
                          ? "border-[#171717] bg-[#171717] text-white"
                          : "border-[#171717]/15 bg-white/55 text-[#2a2925] hover:border-[#171717]/45",
                      )}
                      onClick={() => setIntent(item)}
                      type="button"
                    >
                      <span>{intentLabel[item]}</span>
                      <span aria-hidden="true">{item === intent ? "On" : "+"}</span>
                    </button>
                  </li>
                ))}
              </menu>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-sm">
            {["Intent", "Schema", "Renderer"].map((label, index) => (
              <div className="border-t border-[#171717]/20 pt-3" key={label}>
                <p className="font-black">{String(index + 1).padStart(2, "0")}</p>
                <p className="text-[#665f54]">{label}</p>
              </div>
            ))}
          </div>
        </aside>

        <div className="grid content-center gap-6">
          <section className="grid gap-5 lg:grid-cols-[1fr_320px]">
            <div className="rounded-lg border border-[#171717]/15 bg-white p-5 shadow-[0_24px_80px_rgba(23,23,23,0.08)]">
              <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#7a3f2b]">Generated experience</p>
                  <h2 className="text-3xl font-black">{plan.title}</h2>
                </div>
                <span className="rounded-full bg-[#dbe9dd] px-3 py-1 text-sm font-bold text-[#25422d]">
                  {plan.intent}
                </span>
              </div>
              <div className="grid gap-4">
                {plan.blocks.map((block, index) => (
                  <GeneratedBlock block={block} index={index} key={`${block.kind}-${index}`} />
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <InfoPanel label="Prompt" value={plan.prompt} />
              <InfoPanel label="Design principle" value={plan.principle} />
              <InfoPanel label="Why this UI" value={plan.description} />
            </div>
          </section>

          <section className="grid gap-4 rounded-lg border border-[#171717]/15 bg-[#171717] p-5 text-white lg:grid-cols-[220px_1fr]">
            <div>
              <p className="text-sm font-semibold text-[#f0bd75]">Schema preview</p>
              <h2 className="mt-1 text-2xl font-black">LLM に任せる境界を小さくする</h2>
            </div>
            <pre className="overflow-x-auto rounded-md bg-black/35 p-4 text-xs leading-6 text-[#f7f3ec]">
              {JSON.stringify(plan, null, 2)}
            </pre>
          </section>
        </div>
      </section>
    </main>
  );
}

const intentLabel = {
  dashboard: "進捗を俯瞰する",
  onboarding: "初回体験を作る",
  timeline: "ロードマップ化する",
} satisfies Record<StudyIntent, string>;

function GeneratedBlock({ block, index }: { block: UiBlock; index: number }) {
  if (block.kind === "hero") {
    return (
      <article className="grid gap-4 rounded-md bg-[#f0bd75] p-5 text-[#171717] sm:grid-cols-[1fr_140px]">
        <div>
          <p className="text-sm font-black">Block {index + 1}</p>
          <h3 className="mt-2 text-3xl font-black">{block.title}</h3>
          <p className="mt-3 max-w-xl leading-7">{block.body}</p>
        </div>
        <div className="grid aspect-square place-items-center rounded-full border border-[#171717]/20 bg-white/45 text-center">
          <span className="px-3 text-3xl font-black">{block.metric}</span>
        </div>
      </article>
    );
  }

  if (block.kind === "stats") {
    return (
      <article className="grid gap-3 sm:grid-cols-3">
        {block.items.map((item) => (
          <div className="rounded-md border border-[#171717]/15 bg-[#f7f3ec] p-4" key={item.label}>
            <p className="text-sm text-[#665f54]">{item.label}</p>
            <p className="mt-2 text-3xl font-black">{item.value}</p>
          </div>
        ))}
      </article>
    );
  }

  if (block.kind === "form") {
    return (
      <article className="rounded-md border border-[#171717]/15 p-4">
        <h3 className="text-lg font-black">{block.title}</h3>
        <div className="mt-4 grid gap-3">
          {block.fields.map((field) => (
            <label className="grid gap-2 text-sm font-semibold" key={field.label}>
              {field.label}
              <input
                className="h-11 rounded-md border border-[#171717]/20 bg-[#f7f3ec] px-3 font-normal outline-none focus:border-[#7a3f2b]"
                placeholder={field.placeholder}
                type={field.type}
              />
            </label>
          ))}
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-md border border-[#171717]/15 p-4">
      <h3 className="text-lg font-black">{block.title}</h3>
      <div className="mt-4 grid gap-3">
        {block.steps.map((step) => (
          <div className="grid grid-cols-[76px_1fr] gap-4" key={step.label}>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-center text-xs font-black",
                step.state === "done" && "bg-[#dbe9dd] text-[#25422d]",
                step.state === "next" && "bg-[#f0bd75] text-[#171717]",
                step.state === "later" && "bg-[#e8e2d8] text-[#665f54]",
              )}
            >
              {step.label}
            </span>
            <p className="text-sm leading-6 text-[#4d4840]">{step.description}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function InfoPanel({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-lg border border-[#171717]/15 bg-white p-5">
      <p className="text-sm font-black text-[#7a3f2b]">{label}</p>
      <p className="mt-3 leading-7 text-[#3a3731]">{value}</p>
    </article>
  );
}
