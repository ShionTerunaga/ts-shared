import type { Dict } from "../types/object";

export function omitElementObject<T extends object, S extends keyof T>(
  obj: T,
  keys: S[],
): Omit<T, S> {
  const entries = Object.entries(obj).filter(([k]) => {
    return !keys.some((key) => String(key) === k);
  });

  const typedResult: Dict<unknown> = {};
  for (const [k, v] of entries) {
    if (k in obj) {
      typedResult[k] = v;
    }
  }

  return typedResult as Omit<T, S>;
}
