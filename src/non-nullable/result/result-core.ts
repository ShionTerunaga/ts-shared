const basic = {
  RESULT_OK: "ok",
  RESULT_NG: "ng",
} as const;

interface OK<T> {
  readonly kind: typeof basic.RESULT_OK;
  readonly value: T;
}

interface Err<E> {
  readonly kind: typeof basic.RESULT_NG;
  readonly err: E;
}

export type Result<T, E> = OK<NonNullable<T>> | Err<NonNullable<E>>;

export function createOk<T>(value: NonNullable<T>): Result<T, never> {
  return { kind: basic.RESULT_OK, value };
}

export function createErr<E>(err: NonNullable<E>): Result<never, E> {
  return { kind: basic.RESULT_NG, err };
}

export function isOk<T, E>(result: Result<T, E>): result is OK<NonNullable<T>> {
  return result.kind === basic.RESULT_OK;
}

export function isErr<T, E>(result: Result<T, E>): result is Err<NonNullable<E>> {
  return result.kind === basic.RESULT_NG;
}
