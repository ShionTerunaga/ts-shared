# ts-common

`packages/utils/src` からパッケージ化された TypeScript の共通ユーティリティ集です。

[English README](./README.md)

## GitHub からインストール

```bash
npm i github:ShionTerunaga/ts-common
```

## 使い方

```ts
import { optionUtility, resultUtility, createHttpError } from "ts-common";
```

型定義は `prepare` 時に自動生成されるため、この GitHub リポジトリを直接インストールしてもそのまま利用できます。

## 開発

```bash
vp install
vp run ts-common-utils#check
vp run ts-common-utils#test
vp run ts-common-utils#build
```
