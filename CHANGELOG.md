# ts-shared

## 1.0.0

### Major Changes

- [`1d7475f`](https://github.com/ShionTerunaga/ts-shared/commit/1d7475fe8aea4af7af6ca182d4e4f2cac1ef014f) Thanks [@ShionTerunaga](https://github.com/ShionTerunaga)! - - `src/utils/class-merger.ts`: CSS クラス名の重複除去と結合を行うユーティリティ
  - `src/utils/env-parse.ts`: 環境変数を安全に読み取り、必要な型へ変換するユーティリティ
  - `src/utils/is.ts`: `null` や `undefined` などの判定を行う型ガード群
  - `src/utils/object.ts`: オブジェクトのキー判定や不要な要素除去を行うユーティリティ
  - `src/utils/option.ts`: `Option` 型を扱うためのヘルパー群
  - `src/utils/result.ts`: `Result` 型を扱うための成功・失敗ユーティリティ

### Patch Changes

- [#1](https://github.com/ShionTerunaga/ts-shared/pull/1) [`66de0c4`](https://github.com/ShionTerunaga/ts-shared/commit/66de0c4e809113f360ee5bdbaa6051572e3bba07) Thanks [@ShionTerunaga](https://github.com/ShionTerunaga)! - We have improved the performance of `classMerger`
