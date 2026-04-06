export { classMerger } from "./merger/class-merger";
export { BaseError, type BaseErrorOptions } from "./error/base-error";
export {
  BadGatewayError,
  BadRequestError,
  BaseHttpError,
  ConflictError,
  ForbiddenError,
  GatewayTimeoutError,
  GoneError,
  type HttpErrorOptions,
  InternalServerError,
  MethodNotAllowedError,
  NotFoundError,
  NotAcceptableError,
  NotImplementedError,
  PayloadTooLargeError,
  PaymentRequiredError,
  PreconditionFailedError,
  ProxyAuthenticationRequiredError,
  ServiceUnavailableError,
  TimeoutError,
  TooManyRequestsError,
  UnauthorizedError,
  UnprocessableEntityError,
  UnsupportedMediaTypeError,
} from "./error/http-error";
export { SchemeError, type SchemeErrorOptions } from "./error/scheme-error";
export {
  ValidationError,
  type ValidationErrorOptions,
  type ValidationIssue,
} from "./error/validation-error";
export { isNull, isUndefined } from "./common/is";
export { isKeyOf, isOmitObject, omitElementObject } from "./object/object";
export { envParse } from "./non-nullable/env-parse";
export { optionUtility, type Option } from "./non-nullable/option";

//result
export * from "./non-nullable/result/result-core";
export * from "./non-nullable/result/result-process";

export type { Dict, Without } from "./types/object";
