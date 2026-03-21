# ts-common-by-teru

`packages/utils/src` からパッケージ化された TypeScript の共通ユーティリティ集です。

[English README](./README.md)

## GitHub からインストール

```bash
npm i github:ShionTerunaga/ts-common-by-teru#release
```

## 使い方

```ts
import { optionUtility, resultUtility } from "ts-common";
```

ビルド済みファイルを `release` ブランチに含めているため、ビルドスクリプトを実行せずにこの GitHub リポジトリを直接インストールできます。

リポジトリ同梱の配布ファイルを更新する場合は、`vp pack` を手動実行して更新後の `dist/` をコミットしてから `release` に反映してください。

## 開発

```bash
vp install
vp run ts-common-utils#check
vp run ts-common-utils#test
vp run ts-common-utils#build
```
