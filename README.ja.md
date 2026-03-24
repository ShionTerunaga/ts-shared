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
