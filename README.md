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

## Development

```bash
vp install
vp check
vp test
vp build
```

## Release Flow

Create a changeset for user-facing changes before opening or merging a PR.

```bash
vp run changeset
```

The `Release PR` workflow opens or updates a release PR from `main` into `release`. After that PR is merged into `release`, the `Publish Release` workflow rebuilds `dist/`, pushes the built artifacts if needed, and then creates or updates the Git tag and GitHub Release.
Each generated changelog item will also include the source PR and the contributor's GitHub username.
