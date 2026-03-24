# ts-shared

Shared TypeScript utilities packaged.

[日本語 README](./README.ja.md)

## Install From GitHub

```bash
npm i github:ShionTerunaga/ts-shared#release
```

## Usage

```ts
import { optionUtility, resultUtility } from "ts-shared";
```

The built files are committed to the `release` branch, so the package can be installed directly from this GitHub repository without running build scripts.

When updating the files shipped from the repository, run `vp pack` manually and commit the refreshed `dist/` output before merging into `release`.

## Development

```bash
vp install
vp check
vp test
vp build
```
