---
"ts-shared": major
---

Refactor the `Result` API by splitting it into `result-core` and `result-process`, and re-export the new modules from the package entrypoint.

The public API now uses `createErr`, `isOk`, `isErr`, and `kind`-based checks instead of the previous `createNg` and boolean flag style.
