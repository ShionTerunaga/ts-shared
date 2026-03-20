# ts-common

Shared TypeScript utilities packaged from `packages/utils/src`.

[日本語 README](./README.ja.md)

## Install From GitHub

```bash
npm i github:ShionTerunaga/ts-common#release
```

## Usage

```ts
import { optionUtility, resultUtility, createHttpError } from "ts-common";
```

The built files are committed to the `release` branch, so the package can be installed directly from this GitHub repository without running build scripts.

## Development

```bash
vp install
vp run ts-common-utils#check
vp run ts-common-utils#test
vp run ts-common-utils#build
```
