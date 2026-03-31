export interface BaseErrorOptions {
  cause?: unknown;
  code?: string;
  details?: unknown;
  message?: string;
  name?: string;
}

export class BaseError extends Error {
  declare cause?: unknown;
  declare code?: string;
  declare details?: unknown;

  constructor(options: BaseErrorOptions = {}) {
    const { cause, code, details, message = "Application Error", name = "BaseError" } = options;

    super(message, cause === undefined ? undefined : { cause });

    this.name = name;
    this.code = code;
    this.details = details;

    if (cause !== undefined && !("cause" in this)) {
      Object.defineProperty(this, "cause", {
        configurable: true,
        enumerable: false,
        value: cause,
        writable: true,
      });
    }
  }
}
