# ts-shared

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
