# ts-shared

## 1.1.4

### Patch Changes

- [`40fe34b`](https://github.com/ShionTerunaga/ts-shared/commit/40fe34b647d99d0407b73ade181b69dccedeb201) Thanks [@github-actions[bot]](https://github.com/github-actions%5Bbot%5D)! - I removed the unnecessary functions.

## 1.1.3

### Patch Changes

- [`121e175`](https://github.com/ShionTerunaga/ts-shared/commit/121e17508ffc8656ee52481d2e3c5e8c4a6b5bf5) Thanks [@github-actions[bot]](https://github.com/github-actions%5Bbot%5D)! - I have exported the `Unit` type.

## 1.1.2

### Patch Changes

- [`ea42d1c`](https://github.com/ShionTerunaga/ts-shared/commit/ea42d1c8c7e95b7535c1bd5f0c7c9d068a5406ca) Thanks [@github-actions[bot]](https://github.com/github-actions%5Bbot%5D)! - I've set it up so that changes are automatically pushed to the release branch and release notes are generated automatically. This isn't really related to the main project.

## 1.1.1

### Patch Changes

- [`99f1dc8`](https://github.com/ShionTerunaga/ts-shared/commit/99f1dc87fa4e5f427ad3d41532aaf6c1665f784e) Thanks [@github-actions[bot]](https://github.com/github-actions%5Bbot%5D)! - Slim down the release branch package manifest so published artifacts keep only the fields needed for distribution and remain package-manager agnostic.

## 1.1.0

### Minor Changes

- [#6](https://github.com/ShionTerunaga/ts-shared/pull/6) [`315acb5`](https://github.com/ShionTerunaga/ts-shared/commit/315acb5988bcdbe688681fcb9d0b8ce91f55b235) Thanks [@ShionTerunaga](https://github.com/ShionTerunaga)! - Add reusable error classes (BaseError, HTTP errors, SchemeError, ValidationError)

### Patch Changes

- [`856772f`](https://github.com/ShionTerunaga/ts-shared/commit/856772fa0378309feaceb4bb85899ff48c19bfc9) Thanks [@github-actions[bot]](https://github.com/github-actions%5Bbot%5D)! - Update the release workflow to publish from the built `release` branch artifacts and generate tags and release notes from the latest changelog on `main`.

## 1.0.2

### Patch Changes

- [`ab380fa`](https://github.com/ShionTerunaga/ts-shared/commit/ab380fa2681ca221a7fdb2465bf1af5d3ed2b965) Thanks [@ShionTerunaga](https://github.com/ShionTerunaga)! - Update the version of the dependency package

## 1.0.1

### Patch Changes

- [`8212114`](https://github.com/ShionTerunaga/ts-shared/commit/8212114581959733af4e55670e134eef085db674) Thanks [@ShionTerunaga](https://github.com/ShionTerunaga)! - Change the import of `classMerger` to a named import

## 1.0.0

### Major Changes

- [`ce6c814`](https://github.com/ShionTerunaga/ts-shared/commit/ce6c814553283c2c6eeaffe9f46b71242ab1fa99) Thanks [@ShionTerunaga](https://github.com/ShionTerunaga)! - - `src/utils/class-merger.ts`: CSS クラス名の重複除去と結合を行うユーティリティ
  - `src/utils/env-parse.ts`: 環境変数を安全に読み取り、必要な型へ変換するユーティリティ
  - `src/utils/is.ts`: `null` や `undefined` などの判定を行う型ガード群
  - `src/utils/object.ts`: オブジェクトのキー判定や不要な要素除去を行うユーティリティ
  - `src/utils/option.ts`: `Option` 型を扱うためのヘルパー群
  - `src/utils/result.ts`: `Result` 型を扱うための成功・失敗ユーティリティ
