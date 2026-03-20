# ts-common

`packages/utils/src` からパッケージ化された TypeScript の共通ユーティリティ集です。

[English README](./README.md)

## GitHub からインストール

```bash
npm i github:ShionTerunaga/ts-common#release
```

## 使い方

```ts
import { optionUtility, resultUtility, createHttpError } from "ts-common";
```

ビルド済みファイルを `release` ブランチに含めているため、ビルドスクリプトを実行せずにこの GitHub リポジトリを直接インストールできます。

## 開発

```bash
vp install
vp run ts-common-utils#check
vp run ts-common-utils#test
vp run ts-common-utils#build
```
