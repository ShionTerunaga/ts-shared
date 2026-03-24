# ts-shared

TypeScript の共通ユーティリティ集です。

[English README](./README.md)

## GitHub からインストール

```bash
npm i github:ShionTerunaga/ts-shared#release
```

## 使い方

```ts
import { optionUtility, resultUtility } from "ts-shared";
```

ビルド済みファイルを `release` ブランチに含めているため、ビルドスクリプトを実行せずにこの GitHub リポジトリを直接インストールできます。

## 開発

```bash
vp install
vp check
vp test
vp build
```

## リリースフロー

ユーザー向けの変更を含む PR では、事前に changeset を作成してください。

```bash
vp run changeset
```

`Release PR` workflow が `main` から `release` への release PR を自動で作成または更新します。その PR を `release` にマージすると、`Publish Release` workflow が `dist/` の再ビルド、必要な配布ファイルの push、タグ作成、GitHub Release の作成または更新まで自動で実行します。
生成される changelog の各項目には、元 PR へのリンクとコントリビュータの GitHub ユーザー名も含まれます。
