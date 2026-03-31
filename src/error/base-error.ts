export interface BaseErrorOptions {
  cause?: unknown;
  code?: string;
  details?: unknown;
  message?: string;
  name?: string;
}

export class BaseError extends Error {
  cause?: unknown;
  code?: string;
  details?: unknown;

  constructor(options: BaseErrorOptions = {}) {
    const { cause, code, details, message = "Application Error", name = "BaseError" } = options;

    super(message);

    this.name = name;
    this.code = code;
    this.details = details;
    this.cause = cause;
  }
}
