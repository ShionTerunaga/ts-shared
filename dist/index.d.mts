//#region src/utils/class-merger.d.ts
declare function classMerger(classes: Array<string>): string;
//#endregion
//#region src/utils/option.d.ts
declare const basic$1: {
  readonly OPTION_SOME: "some";
  readonly OPTION_NONE: "none";
};
interface Some<T> {
  readonly kind: typeof basic$1.OPTION_SOME;
  readonly isSome: true;
  readonly isNone: false;
  readonly value: T;
}
interface None {
  readonly kind: typeof basic$1.OPTION_NONE;
  readonly isSome: false;
  readonly isNone: true;
}
type Option<T> = Some<NonNullable<T>> | None;
declare const optionUtility: Readonly<{
  createSome: <T>(value: NonNullable<T>) => Option<T>;
  createNone: () => Option<never>;
  optionConversion: <T extends {}>(value: T | null | undefined) => Option<T>;
}>;
//#endregion
//#region src/utils/env-parse.d.ts
declare function envParse(env: string | undefined): Option<string>;
//#endregion
//#region src/utils/is.d.ts
declare function isNull(value: unknown): value is null;
declare function isUndefined(value: unknown): value is undefined;
//#endregion
//#region src/types/object.d.ts
/**
 * 柔軟なオブジェクト
 */
type Dict<T> = Record<string, T>;
/**
 * Omitよりも厳密に型をチェックする(Omitは余計なプロパティを許容してしまう)
 */
type Without<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] } & { [P in K]?: never };
//#endregion
//#region src/utils/object.d.ts
/**
 * オブジェクトから要素を省く関数（非破壊）
 * - 元オブジェクトは変更しません
 * - `as` / `any` を使わず、型ガードでキーを検証します
 */
declare function isKeyOf<T extends object>(key: PropertyKey, obj: T): key is keyof T;
declare function isOmitObject<T extends object, S extends keyof T>(
  currentObj: Dict<unknown>,
  keys: S[],
): currentObj is Omit<T, S>;
declare function omitElementObject<T extends object, S extends keyof T>(
  obj: T,
  keys: S[],
): Omit<T, S>;
//#endregion
//#region src/utils/result.d.ts
declare const basic: {
  readonly RESULT_OK: "ok";
  readonly RESULT_NG: "ng";
};
interface OK<T> {
  readonly kind: typeof basic.RESULT_OK;
  readonly isOk: true;
  readonly isErr: false;
  readonly value: T;
}
interface NG<E> {
  readonly kind: typeof basic.RESULT_NG;
  readonly isOk: false;
  readonly isErr: true;
  readonly err: E;
}
interface CheckResultReturn<T, E> {
  fn: () => NonNullable<T>;
  err: (e: unknown) => Result<never, NonNullable<E>>;
}
interface CheckResultVoid<E> {
  fn: () => void;
  err: (e: unknown) => Result<never, NonNullable<E>>;
}
interface CheckPromiseReturn<T, E> {
  fn: () => Promise<NonNullable<T>>;
  err: (e: unknown) => Result<never, NonNullable<E>>;
}
interface CheckPromiseVoid<E> {
  fn: () => Promise<void>;
  err: (e: unknown) => Result<never, NonNullable<E>>;
}
declare const UNIT_SYMBOL: unique symbol;
interface Unit {
  readonly _unit: typeof UNIT_SYMBOL;
}
type Result<T, E> = OK<NonNullable<T>> | NG<NonNullable<E>>;
declare const resultUtility: Readonly<{
  UNIT: Unit;
  checkResultReturn: <T, E>({ fn, err }: CheckResultReturn<T, E>) => Result<T, E>;
  checkResultVoid: <E>({ fn, err }: CheckResultVoid<E>) => Result<Unit, E>;
  checkPromiseReturn: <T, E>({ fn, err }: CheckPromiseReturn<T, E>) => Promise<Result<T, E>>;
  checkPromiseVoid: <E>({ fn, err }: CheckPromiseVoid<E>) => Promise<Result<Unit, E>>;
  createOk: <T>(value: NonNullable<T>) => Result<T, never>;
  createNg: <E>(err: NonNullable<E>) => Result<never, E>;
}>;
//#endregion
export {
  type Dict,
  type Option,
  type Result,
  type Without,
  classMerger,
  envParse,
  isKeyOf,
  isNull,
  isOmitObject,
  isUndefined,
  omitElementObject,
  optionUtility,
  resultUtility,
};
