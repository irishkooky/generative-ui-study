# Generative UI Study

TanStack Start と Cloudflare Workers で Generative UI を学ぶための実験プロジェクトです。

このリポジトリは `lightsound/tanstack-start-start` をベースに、AI が直接 React を生成する前段階として重要な「intent -> UI schema -> renderer」の流れを触れる学習ラボに更新しています。

## 学べること

- ユーザーの目的を `StudyIntent` として分類する
- 目的ごとに UI schema を生成する
- schema を React component に渡して UI を描画する
- LLM 連携前に、生成結果の境界を型で小さく保つ
- TanStack Start アプリを Cloudflare Workers にデプロイする

## 主要ファイル

| File                       | Purpose                                      |
| -------------------------- | -------------------------------------------- |
| `src/lib/generative-ui.ts` | intent から UI schema を返す学習用 generator |
| `src/routes/index.tsx`     | schema を描画する interactive renderer       |
| `wrangler.jsonc`           | Cloudflare Workers のデプロイ設定            |

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

- `createUiPlan` の前段に LLM API を置き、JSON schema を検証してから renderer に渡す
- 生成失敗時に fallback UI を表示する
- Cloudflare Workers AI や AI Gateway と接続する
- UI block を増やし、form, chart, table, timeline などを schema 化する

## License

[MIT](LICENSE.md).
