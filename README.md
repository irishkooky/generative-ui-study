# Generative UI Study

TanStack Start と Cloudflare Workers で、AI が加わった Web UI を学ぶための実験プロジェクトです。

このプロジェクトで扱う Generative UI は「画面全体を AI に作らせる」ことではなく、チャットやエージェント体験の中で、テキストだけでは足りない瞬間に操作可能な UI を差し込む設計です。

参考にした観点:

- AI は Web の「出力者」になり、会話の中で UI を返す
- UI は入口のページではなく、必要な瞬間に差し込まれる部品になる
- MCP Apps は HTML/iframe sandbox、A2UI や json-render は宣言的 JSON という別アプローチを取る
- AI は Web の「消費者」にもなり、Web アプリは人間向け UI と AI 向け tool の両方を持つ
- llms.txt や Markdown 版は、AI にとってコンテキスト効率のよい入口になる

## 学べること

- チャットの途中に UI surface を挿入する体験設計
- MCP Apps 的な `ui:/resource` と tool response の関係
- A2UI/json-render 的なフラット component spec と renderer
- WebMCP 的な human-in-the-loop の tool 公開
- AI エージェント向けの `/llms.txt` と `/llms-full.txt`
- TanStack Start アプリを Cloudflare Workers にデプロイする流れ

## 主要ファイル

| File                       | Purpose                                                |
| -------------------------- | ------------------------------------------------------ |
| `src/lib/generative-ui.ts` | MCP Apps / A2UI / WebMCP の学習 scenario と UI surface |
| `src/routes/index.tsx`     | チャット内に UI surface を差し込む interactive demo    |
| `public/llms.txt`          | AI エージェント向けの短い案内                          |
| `public/llms-full.txt`     | AI エージェント向けの詳細説明                          |
| `wrangler.jsonc`           | Cloudflare Workers のデプロイ設定                      |

## セットアップ

```bash
vp install
vp dev
```

Vite が表示する URL をブラウザで開きます。

## よく使うコマンド

| Command         | Purpose                                 |
| --------------- | --------------------------------------- |
| `vp dev`        | 開発サーバー                            |
| `vp check`      | format, lint, type-check                |
| `vp test`       | テスト                                  |
| `vp build`      | 本番ビルド                              |
| `vp run deploy` | build 後に Cloudflare Workers へ deploy |

## Cloudflare Workers

初回のみ Cloudflare にログインします。

```bash
vp dlx wrangler@latest login
```

デプロイ:

```bash
vp run deploy
```

`wrangler.jsonc` は TanStack Start の build output に合わせて、static assets を `dist/client`、Worker entry を `dist/server/server.js` に向けています。

## 次に試すとよい拡張

- OpenAI / Workers AI / AI Gateway と接続し、component spec をストリーミング生成する
- Zod などで catalog schema を定義し、LLM 出力を検証してから描画する
- MCP Apps の resource HTML を実際に別 bundle として生成する
- WebMCP の提案に寄せて、フォームやアクションを宣言的に tool 化する
- `Accept: text/markdown` に応じた Markdown response を Workers で返す

## License

[MIT](LICENSE.md).
