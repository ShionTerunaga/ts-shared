//#region src/merger/class-merger.d.ts
declare function classMerger(classes: ReadonlyArray<string>): string;
//#endregion
//#region src/error/base-error.d.ts
interface BaseErrorOptions {
  cause?: unknown;
  code?: string;
  details?: unknown;
  message?: string;
  name?: string;
}
declare class BaseError extends Error {
  cause?: unknown;
  code?: string;
  details?: unknown;
  constructor(options?: BaseErrorOptions);
}
//#endregion
//#region src/error/http-error.d.ts
interface HttpErrorOptions extends BaseErrorOptions {
  expose?: boolean;
  status?: number;
  statusText?: string;
}
declare class BaseHttpError extends BaseError {
  expose: boolean;
  status: number;
  statusText: string;
  constructor(options?: HttpErrorOptions);
}
declare class UnauthorizedError extends BaseHttpError {
  constructor(options?: HttpErrorOptions);
}
declare class BadRequestError extends BaseHttpError {
  constructor(options?: HttpErrorOptions);
}
declare class PaymentRequiredError extends BaseHttpError {
  constructor(options?: HttpErrorOptions);
}
declare class ForbiddenError extends BaseHttpError {
  constructor(options?: HttpErrorOptions);
}
declare class MethodNotAllowedError extends BaseHttpError {
  constructor(options?: HttpErrorOptions);
}
declare class NotAcceptableError extends BaseHttpError {
  constructor(options?: HttpErrorOptions);
}
declare class ProxyAuthenticationRequiredError extends BaseHttpError {
  constructor(options?: HttpErrorOptions);
}
declare class NotFoundError extends BaseHttpError {
  constructor(options?: HttpErrorOptions);
}
declare class ConflictError extends BaseHttpError {
  constructor(options?: HttpErrorOptions);
}
declare class GoneError extends BaseHttpError {
  constructor(options?: HttpErrorOptions);
}
declare class PreconditionFailedError extends BaseHttpError {
  constructor(options?: HttpErrorOptions);
}
declare class PayloadTooLargeError extends BaseHttpError {
  constructor(options?: HttpErrorOptions);
}
declare class UnsupportedMediaTypeError extends BaseHttpError {
  constructor(options?: HttpErrorOptions);
}
declare class UnprocessableEntityError extends BaseHttpError {
  constructor(options?: HttpErrorOptions);
}
declare class TooManyRequestsError extends BaseHttpError {
  constructor(options?: HttpErrorOptions);
}
declare class TimeoutError extends BaseHttpError {
  constructor(options?: HttpErrorOptions);
}
declare class InternalServerError extends BaseHttpError {
  constructor(options?: HttpErrorOptions);
}
declare class NotImplementedError extends BaseHttpError {
  constructor(options?: HttpErrorOptions);
}
declare class BadGatewayError extends BaseHttpError {
  constructor(options?: HttpErrorOptions);
}
declare class ServiceUnavailableError extends BaseHttpError {
  constructor(options?: HttpErrorOptions);
}
declare class GatewayTimeoutError extends BaseHttpError {
  constructor(options?: HttpErrorOptions);
}
//#endregion
//#region src/error/scheme-error.d.ts
interface SchemeErrorOptions extends BaseErrorOptions {
  allowedSchemes?: string[];
  receivedScheme?: string;
}
declare class SchemeError extends BaseError {
  readonly allowedSchemes: string[];
  readonly receivedScheme?: string;
  constructor(options?: SchemeErrorOptions);
}
//#endregion
//#region src/error/validation-error.d.ts
interface ValidationIssue {
  message: string;
  path?: string;
}
interface ValidationErrorOptions extends BaseErrorOptions {
  field?: string;
  issues?: ValidationIssue[];
}
declare class ValidationError extends BaseError {
  readonly field?: string;
  readonly issues: ValidationIssue[];
  constructor(options?: ValidationErrorOptions);
}
//#endregion
//#region src/common/is.d.ts
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
//#region src/object/object.d.ts
/**
 * オブジェクトから要素を省く関数（非破壊）
 * - 元オブジェクトは変更しません
 * - `as` / `any` を使わず、型ガードでキーを検証します
 */
declare function isKeyOf<T extends object>(key: PropertyKey, obj: T): key is keyof T;
declare function isOmitObject<T extends object, S extends keyof T>(currentObj: Dict<unknown>, keys: S[]): currentObj is Omit<T, S>;
declare function omitElementObject<T extends object, S extends keyof T>(obj: T, keys: S[]): Omit<T, S>;
//#endregion
//#region src/non-nullable/option.d.ts
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
  optionConversion: <T>(value: T) => Option<T>;
}>;
//#endregion
//#region src/non-nullable/env-parse.d.ts
declare function envParse(env: string | undefined): Option<string>;
//#endregion
//#region src/non-nullable/result/result-core.d.ts
declare const basic: {
  readonly RESULT_OK: "ok";
  readonly RESULT_NG: "ng";
};
interface OK<T> {
  readonly kind: typeof basic.RESULT_OK;
  readonly value: T;
}
interface Err<E> {
  readonly kind: typeof basic.RESULT_NG;
  readonly err: E;
}
type Result<T, E> = OK<NonNullable<T>> | Err<NonNullable<E>>;
declare function createOk<T>(value: NonNullable<T>): Result<T, never>;
declare function createErr<E>(err: NonNullable<E>): Result<never, E>;
declare function isOk<T, E>(result: Result<T, E>): result is OK<NonNullable<T>>;
declare function isErr<T, E>(result: Result<T, E>): result is Err<NonNullable<E>>;
//#endregion
//#region src/non-nullable/result/result-process.d.ts
interface CheckResultReturn<T, E> {
  fn: () => NonNullable<T>;
  err: (e: unknown) => Result<never, NonNullable<E>>;
  finalFn?: () => void;
}
interface CheckResultVoid<E> {
  fn: () => void;
  err: (e: unknown) => Result<never, NonNullable<E>>;
  finalFn?: () => void;
}
interface CheckPromiseReturn<T, E> {
  fn: () => Promise<NonNullable<T>>;
  err: (e: unknown) => Result<never, NonNullable<E>>;
  finalFn?: () => void;
}
interface CheckPromiseVoid<E> {
  fn: () => Promise<void>;
  err: (e: unknown) => Result<never, NonNullable<E>>;
  finalFn?: () => void;
}
declare const UNIT_SYMBOL: unique symbol;
interface Unit {
  readonly _unit: typeof UNIT_SYMBOL;
}
declare const UNIT: Unit;
declare const checkPromiseVoid: <E>({
  fn,
  err,
  finalFn
}: CheckPromiseVoid<E>) => Promise<Result<Unit, E>>;
declare const checkResultReturn: <T, E>({
  fn,
  err,
  finalFn
}: CheckResultReturn<T, E>) => Result<T, E>;
declare const checkResultVoid: <E>({
  fn,
  err,
  finalFn
}: CheckResultVoid<E>) => Result<Unit, E>;
declare const checkPromiseReturn: <T, E>({
  fn,
  err,
  finalFn
}: CheckPromiseReturn<T, E>) => Promise<Result<T, E>>;
//#endregion
export { BadGatewayError, BadRequestError, BaseError, type BaseErrorOptions, BaseHttpError, ConflictError, type Dict, ForbiddenError, GatewayTimeoutError, GoneError, type HttpErrorOptions, InternalServerError, MethodNotAllowedError, NotAcceptableError, NotFoundError, NotImplementedError, type Option, PayloadTooLargeError, PaymentRequiredError, PreconditionFailedError, ProxyAuthenticationRequiredError, Result, SchemeError, type SchemeErrorOptions, ServiceUnavailableError, TimeoutError, TooManyRequestsError, UNIT, UnauthorizedError, UnprocessableEntityError, UnsupportedMediaTypeError, ValidationError, type ValidationErrorOptions, type ValidationIssue, type Without, checkPromiseReturn, checkPromiseVoid, checkResultReturn, checkResultVoid, classMerger, createErr, createOk, envParse, isErr, isKeyOf, isNull, isOk, isOmitObject, isUndefined, omitElementObject, optionUtility };