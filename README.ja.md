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

リポジトリ同梱の配布ファイルを更新する場合は、`vp pack` を手動実行して更新後の `dist/` をコミットしてから `release` に反映してください。

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

`Release` GitHub Actions workflow が `main` 向けの version PR を自動で作成または更新します。その PR をマージすると、パッケージの version 更新、`dist/` の再ビルド、タグ作成、`release` ブランチ同期まで自動で実行されます。
生成される changelog の各項目には、元 PR へのリンクとコントリビュータの GitHub ユーザー名も含まれます。
