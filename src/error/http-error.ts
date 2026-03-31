import { BaseError, type BaseErrorOptions } from "./base-error";

export interface HttpErrorOptions extends BaseErrorOptions {
  expose?: boolean;
  status?: number;
  statusText?: string;
}

export class BaseHttpError extends BaseError {
  expose: boolean;
  status: number;
  statusText: string;

  constructor(options: HttpErrorOptions = {}) {
    const {
      cause,
      code,
      details,
      expose,
      message,
      name = "BaseHttpError",
      status,
      statusText,
    } = options;

    super({
      cause,
      code,
      details,
      message,
      name,
    });

    this.expose = expose ?? false;
    this.status = status ?? 500;
    this.statusText = statusText ?? "Internal Server Error";
  }
}

export class UnauthorizedError extends BaseHttpError {
  constructor(options: HttpErrorOptions = {}) {
    super({
      code: "UNAUTHORIZED",
      expose: true,
      message: "Unauthorized",
      name: "UnauthorizedError",
      status: 401,
      statusText: "Unauthorized",
      ...options,
    });
  }
}

export class BadRequestError extends BaseHttpError {
  constructor(options: HttpErrorOptions = {}) {
    super({
      code: "BAD_REQUEST",
      expose: true,
      message: "Bad Request",
      name: "BadRequestError",
      status: 400,
      statusText: "Bad Request",
      ...options,
    });
  }
}

export class PaymentRequiredError extends BaseHttpError {
  constructor(options: HttpErrorOptions = {}) {
    super({
      code: "PAYMENT_REQUIRED",
      expose: true,
      message: "Payment Required",
      name: "PaymentRequiredError",
      status: 402,
      statusText: "Payment Required",
      ...options,
    });
  }
}

export class ForbiddenError extends BaseHttpError {
  constructor(options: HttpErrorOptions = {}) {
    super({
      code: "FORBIDDEN",
      expose: true,
      message: "Forbidden",
      name: "ForbiddenError",
      status: 403,
      statusText: "Forbidden",
      ...options,
    });
  }
}

export class MethodNotAllowedError extends BaseHttpError {
  constructor(options: HttpErrorOptions = {}) {
    super({
      code: "METHOD_NOT_ALLOWED",
      expose: true,
      message: "Method Not Allowed",
      name: "MethodNotAllowedError",
      status: 405,
      statusText: "Method Not Allowed",
      ...options,
    });
  }
}

export class NotAcceptableError extends BaseHttpError {
  constructor(options: HttpErrorOptions = {}) {
    super({
      code: "NOT_ACCEPTABLE",
      expose: true,
      message: "Not Acceptable",
      name: "NotAcceptableError",
      status: 406,
      statusText: "Not Acceptable",
      ...options,
    });
  }
}

export class ProxyAuthenticationRequiredError extends BaseHttpError {
  constructor(options: HttpErrorOptions = {}) {
    super({
      code: "PROXY_AUTHENTICATION_REQUIRED",
      expose: true,
      message: "Proxy Authentication Required",
      name: "ProxyAuthenticationRequiredError",
      status: 407,
      statusText: "Proxy Authentication Required",
      ...options,
    });
  }
}

export class NotFoundError extends BaseHttpError {
  constructor(options: HttpErrorOptions = {}) {
    super({
      code: "NOT_FOUND",
      expose: true,
      message: "Not Found",
      name: "NotFoundError",
      status: 404,
      statusText: "Not Found",
      ...options,
    });
  }
}

export class ConflictError extends BaseHttpError {
  constructor(options: HttpErrorOptions = {}) {
    super({
      code: "CONFLICT",
      expose: true,
      message: "Conflict",
      name: "ConflictError",
      status: 409,
      statusText: "Conflict",
      ...options,
    });
  }
}

export class GoneError extends BaseHttpError {
  constructor(options: HttpErrorOptions = {}) {
    super({
      code: "GONE",
      expose: true,
      message: "Gone",
      name: "GoneError",
      status: 410,
      statusText: "Gone",
      ...options,
    });
  }
}

export class PreconditionFailedError extends BaseHttpError {
  constructor(options: HttpErrorOptions = {}) {
    super({
      code: "PRECONDITION_FAILED",
      expose: true,
      message: "Precondition Failed",
      name: "PreconditionFailedError",
      status: 412,
      statusText: "Precondition Failed",
      ...options,
    });
  }
}

export class PayloadTooLargeError extends BaseHttpError {
  constructor(options: HttpErrorOptions = {}) {
    super({
      code: "PAYLOAD_TOO_LARGE",
      expose: true,
      message: "Payload Too Large",
      name: "PayloadTooLargeError",
      status: 413,
      statusText: "Payload Too Large",
      ...options,
    });
  }
}

export class UnsupportedMediaTypeError extends BaseHttpError {
  constructor(options: HttpErrorOptions = {}) {
    super({
      code: "UNSUPPORTED_MEDIA_TYPE",
      expose: true,
      message: "Unsupported Media Type",
      name: "UnsupportedMediaTypeError",
      status: 415,
      statusText: "Unsupported Media Type",
      ...options,
    });
  }
}

export class UnprocessableEntityError extends BaseHttpError {
  constructor(options: HttpErrorOptions = {}) {
    super({
      code: "UNPROCESSABLE_ENTITY",
      expose: true,
      message: "Unprocessable Entity",
      name: "UnprocessableEntityError",
      status: 422,
      statusText: "Unprocessable Entity",
      ...options,
    });
  }
}

export class TooManyRequestsError extends BaseHttpError {
  constructor(options: HttpErrorOptions = {}) {
    super({
      code: "TOO_MANY_REQUESTS",
      expose: true,
      message: "Too Many Requests",
      name: "TooManyRequestsError",
      status: 429,
      statusText: "Too Many Requests",
      ...options,
    });
  }
}

export class TimeoutError extends BaseHttpError {
  constructor(options: HttpErrorOptions = {}) {
    super({
      code: "REQUEST_TIMEOUT",
      expose: true,
      message: "Request Timeout",
      name: "TimeoutError",
      status: 408,
      statusText: "Request Timeout",
      ...options,
    });
  }
}

export class InternalServerError extends BaseHttpError {
  constructor(options: HttpErrorOptions = {}) {
    super({
      code: "INTERNAL_SERVER_ERROR",
      expose: false,
      message: "Internal Server Error",
      name: "InternalServerError",
      status: 500,
      statusText: "Internal Server Error",
      ...options,
    });
  }
}

export class NotImplementedError extends BaseHttpError {
  constructor(options: HttpErrorOptions = {}) {
    super({
      code: "NOT_IMPLEMENTED",
      expose: false,
      message: "Not Implemented",
      name: "NotImplementedError",
      status: 501,
      statusText: "Not Implemented",
      ...options,
    });
  }
}

export class BadGatewayError extends BaseHttpError {
  constructor(options: HttpErrorOptions = {}) {
    super({
      code: "BAD_GATEWAY",
      expose: false,
      message: "Bad Gateway",
      name: "BadGatewayError",
      status: 502,
      statusText: "Bad Gateway",
      ...options,
    });
  }
}

export class ServiceUnavailableError extends BaseHttpError {
  constructor(options: HttpErrorOptions = {}) {
    super({
      code: "SERVICE_UNAVAILABLE",
      expose: false,
      message: "Service Unavailable",
      name: "ServiceUnavailableError",
      status: 503,
      statusText: "Service Unavailable",
      ...options,
    });
  }
}

export class GatewayTimeoutError extends BaseHttpError {
  constructor(options: HttpErrorOptions = {}) {
    super({
      code: "GATEWAY_TIMEOUT",
      expose: false,
      message: "Gateway Timeout",
      name: "GatewayTimeoutError",
      status: 504,
      statusText: "Gateway Timeout",
      ...options,
    });
  }
}
