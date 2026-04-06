import { BaseError, type BaseErrorOptions } from "./base-error";

export interface SchemeErrorOptions extends BaseErrorOptions {
  allowedSchemes?: string[];
  receivedScheme?: string;
}

export class SchemeError extends BaseError {
  readonly allowedSchemes: string[];
  readonly receivedScheme?: string;

  constructor(options: SchemeErrorOptions = {}) {
    const { allowedSchemes = [], receivedScheme, ...baseOptions } = options;
    const allowedText = allowedSchemes.length === 0 ? "none" : allowedSchemes.join(", ");
    const receivedText = receivedScheme ?? "unknown";

    super({
      code: "INVALID_SCHEME",
      message: `Invalid scheme: expected one of [${allowedText}], received "${receivedText}"`,
      name: "SchemeError",
      ...baseOptions,
    });

    this.allowedSchemes = allowedSchemes;
    this.receivedScheme = receivedScheme;
  }
}
