# ts-common

Shared TypeScript utilities packaged from `packages/utils/src`.

[日本語 README](./README.ja.md)

## Install From GitHub

```bash
npm i github:ShionTerunaga/ts-common
```

## Usage

```ts
import { optionUtility, resultUtility, createHttpError } from "ts-common";
```

Type definitions are generated during `prepare`, so the package can be installed directly from this GitHub repository.

## Development

```bash
vp install
vp run ts-common-utils#check
vp run ts-common-utils#test
vp run ts-common-utils#build
```
